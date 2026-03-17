/**
 * index.tsx - Home Page
 * Premium UI with Yellow/Orange/Black theme
 */

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import ProblemForm from '../components/ProblemForm'
import ResultView from '../components/ResultView'
import CopyButton from '../components/CopyButton'
import BookmarkButton from '../components/BookmarkButton'
import RelatedProblems from '../components/RelatedProblems'
import Footer from '../components/Footer'
import { explainProblem, checkBackendHealth } from '../utils/api'
import { addToHistory, updateStats } from '../utils/storage'

interface ExplainResponse {
  success: boolean
  question_number: number
  requested_number?: number  // Original requested number (if adjusted)
  explanation?: string
  error?: string
  message?: string  // Message about number adjustment
  problemTitle?: string
  problemDifficulty?: string
}

interface ProblemInfo {
  title: string
  difficulty: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ExplainResponse | null>(null)
  const [backendOnline, setBackendOnline] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null)
  const [problemInfo, setProblemInfo] = useState<ProblemInfo | null>(null)

  useEffect(() => {
    const checkBackend = async () => {
      const isHealthy = await checkBackendHealth()
      setBackendOnline(isHealthy)
    }
    checkBackend()
    const interval = setInterval(checkBackend, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleFormSubmit = async (questionNumber: number, language: string) => {
    setIsLoading(true)
    setCurrentQuestion(questionNumber)
    setResult({
      success: true,
      question_number: questionNumber,
    })

    try {
      const response = await explainProblem(questionNumber, language)
      setResult(response)
      
      // Fetch problem metadata
      try {
        const metaRes = await fetch(`http://localhost:8000/problems/metadata/${questionNumber}`)
        const metaData = await metaRes.json()
        if (metaData.success && metaData.problem) {
          setProblemInfo({
            title: metaData.problem.title,
            difficulty: metaData.problem.difficulty
          })
          
          // Track history and stats
          addToHistory({
            id: questionNumber,
            title: metaData.problem.title,
            timestamp: new Date().toISOString()
          })
          updateStats(metaData.problem.difficulty)
        }
      } catch (error) {
        console.error('Failed to fetch metadata:', error)
      }
    } catch (error) {
      setResult({
        success: false,
        question_number: questionNumber,
        error: 'Unexpected error. Check backend is running.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectProblem = (questionNumber: number) => {
    handleFormSubmit(questionNumber, 'English')
  }

  return (
    <>
      <Head>
        <title>LeetCode AI Explainer - Master Problem Solving</title>
        <meta
          name="description"
          content="Learn LeetCode problems in simple language with AI-powered explanations. Never get stuck again!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://up.yimg.com/ib/th/id/OIP.ymdLUYayjisO2uU47lOI0AHaHa?pid=Api&rs=1&c=1&qlt=95&w=118&h=118" />
        <link rel="shortcut icon" href="https://up.yimg.com/ib/th/id/OIP.ymdLUYayjisO2uU47lOI0AHaHa?pid=Api&rs=1&c=1&qlt=95&w=118&h=118" />
      </Head>

      <div className="min-h-screen bg-gradient-dark flex flex-col">
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Animated Background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Navbar/Header */}
          <header className="relative z-50 border-b border-purple-400/30 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl">
            <div className="px-6 py-4 flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-3xl flex-shrink-0">🎯</span>
                <div className="min-w-0">
                  <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 truncate">
                    LeetCode Explainer
                  </h1>
                  <p className="text-purple-300 text-xs font-bold">Master problems with AI</p>
                </div>
              </div>

              {/* Right Side - Status */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Backend Status */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-purple-400/20">
                  <div className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse flex-shrink-0`}></div>
                  <span className="text-xs font-bold text-gray-300 whitespace-nowrap">
                    {backendOnline ? '✅ Ready' : '❌ Offline'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Area - Vertical Stack */}
          <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
            
            {/* Top Section - Large Search Bar */}
            <section className="flex-shrink-0 border-b border-purple-400/20 bg-gradient-to-b from-white/5 to-transparent py-12 px-6">
              <div className="max-w-4xl mx-auto">
                {/* Title Section */}
                <div className="mb-10">
                  <h2 className="text-4xl font-black mb-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
                      🔍 Find & Learn
                    </span>
                  </h2>
                  <p className="text-gray-400 text-lg">Search any LeetCode problem and get AI-powered insights</p>
                </div>

                {/* Backend Warning */}
                {!backendOnline && (
                  <div className="mb-6 p-4 bg-red-900/20 border-l-4 border-red-500 rounded-xl">
                    <p className="text-red-400 text-sm font-bold">⚠️ Backend Offline</p>
                    <p className="text-xs text-red-300 mt-1">Run: python main.py</p>
                  </div>
                )}

                {/* Form Card - Glassmorphic */}
                <div className="glass p-8 hover:bg-white/10 transition-all duration-300">
                  <ProblemForm
                    onSubmit={handleFormSubmit}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </section>

            {/* Bottom Section - Results Area (Scrollable) */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 max-w-4xl mx-auto w-full">
                {result && result.success && result.explanation ? (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Explanation Content */}
                    <ResultView
                      questionNumber={result.question_number}
                      explanation={result.explanation}
                      isLoading={isLoading}
                      message={result.message}
                      requestedNumber={result.requested_number}
                    />

                    {/* Sticky Action Buttons */}
                    {problemInfo && (
                      <div className="glass p-6 space-y-4 sticky top-6 hover:bg-white/10 transition-all">
                        <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 flex items-center gap-2">
                          ⚡ Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <CopyButton 
                            text={result.explanation} 
                            label="📋 Copy"
                            className="w-full"
                          />
                          <BookmarkButton
                            problemId={result.question_number}
                            title={problemInfo.title}
                            difficulty={problemInfo.difficulty}
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Related Problems */}
                    {result.question_number && (
                      <RelatedProblems
                        problemId={result.question_number}
                        onSelectProblem={handleSelectProblem}
                      />
                    )}
                  </div>
                ) : result && !result.success ? (
                  <div className="glass border-l-4 border-red-500 p-8 animate-slideInUp hover:bg-white/10 transition-all">
                    <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                      <span>❌</span> Error
                    </h3>
                    <p className="text-gray-300 mb-4">{result.error}</p>
                    <div className="text-sm text-gray-400 bg-white/5 p-4 rounded-lg border border-purple-400/20">
                      <p className="font-bold text-blue-400 mb-2">💡 Troubleshoot:</p>
                      <ul className="space-y-1 text-xs">
                        <li>✓ Backend running: python main.py</li>
                        <li>✓ config.py has LLM API key</li>
                        <li>✓ Problem number is valid (1-5)</li>
                      </ul>
                    </div>
                  </div>
                ) : isLoading ? (
                  <ResultView
                    questionNumber={currentQuestion || 0}
                    explanation=""
                    isLoading={true}
                    message={undefined}
                    requestedNumber={undefined}
                  />
                ) : (
                  <div className="glass p-12 text-center hover:bg-white/10 transition-all">
                    <div className="text-7xl mb-6 animate-pulse">🧠</div>
                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 mb-3">
                      Ready to Learn?
                    </h3>
                    <p className="text-gray-400 mb-8 text-lg">
                      Use the search bar above to get started
                    </p>
                    <div className="space-y-2">
                      <p className="font-semibold text-blue-400">Quick Start - Try These:</p>
                      <div className="flex gap-2 justify-center flex-wrap">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            onClick={() => handleFormSubmit(num, 'English')}
                            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-400/50 text-purple-300 rounded-lg font-bold transition-all hover:text-purple-200"
                          >
                            #{num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

        </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
