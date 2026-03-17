import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white/5 to-white/0 border-t border-purple-400/30 mt-12 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Social Links & Contact */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sagar-mapari-00b00a321"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition duration-300 group"
            title="LinkedIn Profile"
          >
            <span className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-blue-500/50 transition duration-300">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.737h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.595zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.705 0-.955.771-1.714 1.956-1.714 1.184 0 1.915.759 1.932 1.714 0 .947-.748 1.705-1.973 1.705zm1.581 11.597H3.635V9.671h3.283v10.781zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </span>
            <span className="hidden sm:inline text-sm">LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/sagarmapari455"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition duration-300 group"
            title="GitHub Profile"
          >
            <span className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-gray-500/50 transition duration-300">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </span>
            <span className="hidden sm:inline text-sm">GitHub</span>
          </a>

          {/* Email */}
          <a
            href="mailto:sagarmapari30@gmail.com"
            className="flex items-center gap-2 text-purple-300 hover:text-blue-300 transition duration-300 group"
            title="Send Email"
          >
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-purple-500/50 transition duration-300">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 8l6 5 6-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="hidden sm:inline text-sm">Email</span>
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-400/20 my-4"></div>

        {/* Copyright & Info */}
        <div className="text-center text-gray-400 text-sm">
          <p className="mb-2">
            🎯{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-semibold">
              LeetCode AI Explainer
            </span>{' '}
            - Master problems with AI
          </p>
          <p className="text-xs">
            © 2026 Sagar Mapari. All rights reserved. | Built with ❤️ to help developers ace LeetCode interviews
          </p>
          <div className="mt-3 flex justify-center gap-4">
            <a href="mailto:sagarmapari30@gmail.com" className="text-blue-400 hover:text-purple-400 transition text-xs">
              Contact
            </a>
            <span className="text-gray-600">•</span>
            <span className="text-xs text-gray-500">v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
