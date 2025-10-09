"use client";

import { useState, useEffect } from "react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  cellTypes: string[];
}

interface QuizData {
  quizInfo: {
    title: string;
    description: string;
    totalQuestions: number;
    passingScore: number;
    isPersonalityQuiz?: boolean;
  };
  cellTypes: { [key: string]: string };
  questions: QuizQuestion[];
}

export default function QuizPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load quiz data
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuizData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load quiz:", err);
        setLoading(false);
      });
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (!quizData) return;

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  const calculatePersonalityResult = () => {
    if (!quizData)
      return {
        cellType: "Unknown",
        description: "Unable to determine",
        counts: {},
      };

    // Count votes for each cell type
    const cellTypeCounts: { [key: string]: number } = {};

    // Initialize all cell types with 0
    Object.keys(quizData.cellTypes).forEach((cellType) => {
      cellTypeCounts[cellType] = 0;
    });

    // Count answers
    selectedAnswers.forEach((answerIndex, questionIndex) => {
      const question = quizData.questions[questionIndex];
      if (question && question.cellTypes[answerIndex]) {
        const cellType = question.cellTypes[answerIndex];
        cellTypeCounts[cellType]++;
      }
    });

    // Find the cell type with most votes
    const winningCellType = Object.entries(cellTypeCounts).reduce((a, b) =>
      cellTypeCounts[a[0]] > cellTypeCounts[b[0]] ? a : b
    )[0];

    return {
      cellType: winningCellType,
      description: quizData.cellTypes[winningCellType] || "Unknown cell type",
      counts: cellTypeCounts,
    };
  };

  const getCellTypeEmoji = (cellType: string) => {
    const emojiMap: { [key: string]: string } = {
      "CD4+": "🤝",
      "CD8+": "⚡",
      "γδ T": "🎨",
      NK: "🛡️",
      B: "📚",
      Monocyte: "🔧",
      Dendritic: "📢",
      Treg: "🕊️",
    };
    return emojiMap[cellType] || "🧬";
  };

  const getCellTypeColor = (cellType: string) => {
    const colorMap: { [key: string]: string } = {
      "CD4+": "text-blue-400",
      "CD8+": "text-red-400",
      "γδ T": "text-purple-400",
      NK: "text-green-400",
      B: "text-indigo-400",
      Monocyte: "text-orange-400",
      Dendritic: "text-yellow-400",
      Treg: "text-pink-400",
    };
    return colorMap[cellType] || "text-gray-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Failed to load quiz data.</p>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {quizData.quizInfo.title}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {quizData.quizInfo.description}
            </p>
            <div className="bg-gray-900 rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                Quiz Details:
              </h3>
              <ul className="text-left space-y-2 text-gray-300">
                <li>• {quizData.questions.length} questions total</li>
                <li>• Personality assessment format</li>
                <li>• No time limit</li>
                <li>• You can go back to previous questions</li>
                <li>• Discover your PBMC personality!</li>
              </ul>
            </div>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const result = calculatePersonalityResult();

    return (
      <div className="min-h-screen bg-black text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Your PBMC Personality</h1>
            <div className="bg-gray-900 rounded-lg p-8 max-w-2xl mx-auto">
              <div className="text-6xl mb-4">
                {getCellTypeEmoji(result.cellType)}
              </div>
              <div
                className={`text-3xl font-bold mb-4 ${getCellTypeColor(
                  result.cellType
                )}`}
              >
                {result.cellType}
              </div>
              <div className="text-xl text-gray-300 mb-6">
                {result.description}
              </div>

              {/* Show breakdown */}
              <div className="bg-gray-800 rounded-lg p-4 mt-6">
                <h4 className="text-lg font-semibold mb-3 text-yellow-400">
                  Your Results Breakdown:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(result.counts).map(([cellType, count]) => (
                    <div key={cellType} className="flex justify-between">
                      <span className={getCellTypeColor(cellType)}>
                        {getCellTypeEmoji(cellType)} {cellType}
                      </span>
                      <span>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={restartQuiz}
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors mr-4"
            >
              Take Quiz Again
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "My PBMC Personality Quiz Result",
                    text: `I'm a ${result.cellType} - ${result.description}!`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(
                    `I just took the PBMC personality quiz and I'm a ${result.cellType} - ${result.description}! Check it out: ${window.location.href}`
                  );
                }
              }}
              className="bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Share Result
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {quizData.questions.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h1 className="text-2xl font-bold mb-6">{question.question}</h1>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                    : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
                }`}
              >
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <button
            onClick={nextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestion === quizData.questions.length - 1
              ? "Get My Result!"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
