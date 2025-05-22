import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // navigate between pages 
import { FaPhone, FaInternetExplorer, FaBolt, FaDice, FaSignal, FaRobot } from 'react-icons/fa'; 
import Modal from 'react-modal'; // for the chatbot popup 
import phoneImage from '../assets/phone.png'; // Adjust path as needed

Modal.setAppElement('#root'); // For accessibility

const HomePage = ({ isLoggedIn }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // isChatbotOpen: A boolean that controls whether the chatbot modal is visible. Initially false.
  const [selectedQuestion, setSelectedQuestion] = useState(null); // selectedQuestion: Stores the currently selected question from the chatbot’s question list. Initially null.
  
  // Q & A
  const questions = [
    { id: 1, text: 'Having trouble buying data?', response: 'Ensure your network selection is correct and try again.' },
    { id: 2, text: 'Having trouble buying electricity?', response: 'You must be logged in. Check your meter number and try again.' },
    { id: 3, text: 'Why isn’t the betting working?', response: 'Betting features are coming soon!' },
  ];
  
  const handleQuestionClick = (question) => setSelectedQuestion(question); // A helper function, handleQuestionClick, updates selectedQuestion when a question is clicked.

  
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-center text-4xl sm:text-6xl md:text-7xl font-bold mt-16 sm:mt-20 md:mt-24 animate-fade-in">
          FAST RECHARGE
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Link
            to="/input"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FaPhone className="mr-2" aria-hidden="true" />
            Airtime
          </Link>
          <Link
            to="/input"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FaInternetExplorer className="mr-2" aria-hidden="true" />
            Data Subscription
          </Link>
          <Link
            to="/electricity"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FaBolt className="mr-2" aria-hidden="true" />
            Electricity
          </Link>
          <Link
            to="/comingsoon"
            className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <FaDice className="mr-2" aria-hidden="true" />
            Betting
          </Link>
        </div>
        <div className="relative mt-16 flex justify-center">
          <img src={phoneImage} alt="Phone" className="w-64 sm:w-72 md:w-80" />
          <FaSignal
            className="absolute -top-4 -left-4 text-blue-500 w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16"
            aria-hidden="true"
          />
        </div>
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <FaRobot size={24} />
          </button>
        </div>
        <Modal
          isOpen={isChatbotOpen}
          onRequestClose={() => setIsChatbotOpen(false)}
          className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto mt-20 text-white"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-2xl font-bold mb-4">AI Chatbot</h2>
          {selectedQuestion ? (
            <div>
              <p className="mb-4">{selectedQuestion.response}</p>
              <button
                onClick={() => setSelectedQuestion(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Back to Questions
              </button>
            </div>
          ) : (
            <ul className="space-y-2">
              {questions.map((q) => (
                <li key={q.id}>
                  <button
                    onClick={() => handleQuestionClick(q)}
                    className="text-left w-full p-2 hover:bg-gray-700 rounded"
                  >
                    {q.text}
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setIsChatbotOpen(false)}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;