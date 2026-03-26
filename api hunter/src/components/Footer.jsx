import React from 'react';

const Footer = ({ studentName = "Your Name", studentId = "Your ID" }) => {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h4 className="mb-2 text-base font-bold text-slate-900">📍 Project</h4>
            <p className="text-sm text-slate-600">API Hunter - Public API Explorer</p>
            <p className="mt-1 text-xs text-slate-500">Built with ReactJS, Vite and Tailwind CSS</p>
          </div>

          <div>
            <h4 className="mb-2 text-base font-bold text-slate-900">👤 Developer</h4>
            <p className="text-sm text-slate-600">Name: {studentName}</p>
            <p className="text-sm text-slate-600">ID: {studentId}</p>
          </div>

          <div>
            <h4 className="mb-2 text-base font-bold text-slate-900">🔗 API Source</h4>
            <a
              href="https://api.apis.guru/v2/list.json"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline hover:text-blue-700"
            >
              APIs.guru Directory
            </a>
            <p className="mt-1 text-xs text-slate-500">Free API directory source</p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-5 text-center">
          <p className="text-sm text-slate-500">
            © 2026 API Hunter. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Made with React and modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
