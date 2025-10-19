import React from 'react';

export default function Contact() {
  return (
    <div className="bg-black text-gray-200 font-pixel px-4 py-12 flex flex-col items-center" id="contact">
      <h2 className="text-3xl pixel-border mb-6">Contact</h2>

      <div className="pixel-border p-6 max-w-xl w-full text-beige text-center space-y-4">
        <p>
          Pour toute collaboration, échange ou simple curiosité, n’hésite pas à me contacter :
        </p>

        <p>
          📧 <strong>Email :</strong>{' '}
          <a
            href="mailto:rayan.el.ouazzani01@gmail.com"
            className="underline hover:text-red-500"
          >
            rayan.el.ouazzani01@gmail.com
          </a>
        </p>

        <p>
          🔗 <strong>LinkedIn :</strong>{' '}
          <a
            href="https://www.linkedin.com/in/rayan-el-ouazzani-529a86214/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-red-500"
          >
            linkedin.com/in/rayan-el-ouazzani
          </a>
        </p>
      </div>
    </div>
  );
}