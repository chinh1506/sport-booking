"use client";
import React, { JSX, useState } from 'react';
import { Play, Pause, RotateCcw, Settings, Menu, X, Gamepad2, Brain, Zap } from 'lucide-react';
import './game.css'; // Import the CSS file for styling

// Embedded CSS styles


// Types and Interfaces
interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface GameType {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface GameData {
  [key: string]: any;
}

type GameKey = 'math-quiz' | 'word-game' | 'quiz-master';

const LLMGameContainer: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<GameKey>('math-quiz');
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [gameData, setGameData] = useState<GameData>({});

  // Game configurations with proper typing
  const gameTypes: Record<GameKey, GameType> = {
    'math-quiz': {
      title: 'Toán Học Thông Minh',
      description: 'Giải các bài toán với sự hỗ trợ của AI',
      icon: Brain,
      color: 'bg-blue-500'
    },
    'word-game': {
      title: 'Trò Chơi Từ Vựng',
      description: 'Mở rộng vốn từ vựng với AI',
      icon: Zap,
      color: 'bg-green-500'
    },
    'quiz-master': {
      title: 'Quiz Master AI',
      description: 'Câu hỏi thông minh do AI tạo ra',
      icon: Gamepad2,
      color: 'bg-purple-500'
    }
  };

  // Math Quiz Game Component
  const MathQuizGame: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question>({
      question: "12 + 8 = ?",
      options: ["18", "20", "22", "24"],
      correct: 1
    });
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);

    const handleAnswer = (index: number): void => {
      setSelectedAnswer(index);
      setShowResult(true);
      if (index === currentQuestion.correct) {
        setScore(prev => prev + 10);
      }
    };

    const generateRandomQuestion = (): Question => {
      const num1: number = Math.floor(Math.random() * 20) + 1;
      const num2: number = Math.floor(Math.random() * 20) + 1;
      const answer: number = num1 + num2;
      
      const wrongAnswers: number[] = [
        answer + Math.floor(Math.random() * 5) + 1,
        answer - Math.floor(Math.random() * 5) - 1,
        answer + Math.floor(Math.random() * 10) + 5
      ];
      
      const allOptions: number[] = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex: number = allOptions.indexOf(answer);

      return {
        question: `${num1} + ${num2} = ?`,
        options: allOptions.map(String),
        correct: correctIndex
      };
    };

    const nextQuestion = (): void => {
      const newQuestion = generateRandomQuestion();
      setCurrentQuestion(newQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
    };

    const getButtonClassName = (index: number): string => {
      const baseClasses = "p-6 rounded-xl border-2 transition-all duration-300 font-bold text-xl";
      
      if (showResult) {
        if (index === currentQuestion.correct) {
          return `${baseClasses} bg-green-100 border-green-500 text-green-700 scale-105`;
        } else if (index === selectedAnswer) {
          return `${baseClasses} bg-red-100 border-red-500 text-red-700`;
        } else {
          return `${baseClasses} bg-white border-gray-200 text-gray-700`;
        }
      } else {
        if (selectedAnswer === index) {
          return `${baseClasses} border-2 text-white scale-105`;
        } else {
          return `${baseClasses} bg-white border-gray-200 hover:scale-105 text-gray-700`;
        }
      }
    };

    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-xl border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Toán Học Thông Minh</h2>
              <p className="text-gray-600">Giải bài toán để tích lũy điểm số!</p>
            </div>
            
            <div className="math-quiz-bg rounded-xl p-6 mb-6">
              <h3 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                {currentQuestion.question}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    className={getButtonClassName(index)}
                    disabled={showResult}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {showResult && (
              <div className="text-center space-y-4">
                <div className={`text-2xl font-bold ${
                  selectedAnswer === currentQuestion.correct ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedAnswer === currentQuestion.correct ? '🎉 Xuất sắc!' : '❌ Thử lại nhé!'}
                </div>
                <button
                  onClick={nextQuestion}
                  className="next-question-btn text-white px-8 py-3 rounded-xl font-semibold text-lg transition-custom transform hover-scale-105"
                  type="button"
                >
                  Câu tiếp theo →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Word Game Component
  const WordGame: React.FC = () => (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-xl border text-center">
          <div className="p-4 rounded-xl mb-6" style={{
            background: 'linear-gradient(135deg, var(--color-primary, #00BCD4) 0%, var(--color-primary-dark, #008BA3) 100%)'
          }}>
            <Zap className="w-16 h-16 text-white mx-auto mb-2" />
            <h2 className="text-3xl font-bold text-white">Trò Chơi Từ Vựng</h2>
          </div>
          <p className="text-xl text-gray-600 mb-8">Game từ vựng thông minh đang được phát triển...</p>
          <div className="p-6 rounded-xl border-2" style={{
            backgroundColor: 'var(--color-primary-bg, #E0F7FA)',
            borderColor: 'var(--color-primary-light, #4DD0E1)'
          }}>
            <p className="text-primary-dark text-lg font-semibold">🎯 Sẵn sàng tích hợp LLM API!</p>
            <p className="text-primary mt-2">Tạo câu hỏi từ vựng động, kiểm tra phát âm, và học từ mới thông minh.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Quiz Master Component  
  const QuizMasterGame: React.FC = () => (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-xl border text-center">
          <div className="p-4 rounded-xl mb-6" style={{
            background: 'linear-gradient(135deg, var(--color-primary-dark, #008BA3) 0%, var(--color-primary, #00BCD4) 100%)'
          }}>
            <Gamepad2 className="w-16 h-16 text-white mx-auto mb-2" />
            <h2 className="text-3xl font-bold text-white">Quiz Master AI</h2>
          </div>
          <p className="text-xl text-gray-600 mb-8">Quiz tổng hợp đa chủ đề đang được hoàn thiện...</p>
          <div className="p-6 rounded-xl border-2" style={{
            backgroundColor: 'var(--color-primary-bg, #E0F7FA)',
            borderColor: 'var(--color-primary-light, #4DD0E1)'
          }}>
            <p className="text-primary-dark text-lg font-semibold">🧠 Sẵn sàng tích hợp LLM API!</p>
            <p className="text-primary mt-2">Tạo câu hỏi thông minh theo cấp độ, phân tích đáp án và đưa ra gợi ý.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentGame = (): JSX.Element => {
    switch(currentGame) {
      case 'math-quiz':
        return <MathQuizGame />;
      case 'word-game':
        return <WordGame />;
      case 'quiz-master':
        return <QuizMasterGame />;
      default:
        return <MathQuizGame />;
    }
  };

  // Game Selection Sidebar Component
  const GameSidebar: React.FC = () => {
    const sidebarClassName = `fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:inset-0`;

    const handleGameSelect = (gameKey: GameKey): void => {
      setCurrentGame(gameKey);
      setSidebarOpen(false);
    };

    const handleResetScore = (): void => {
      setScore(0);
    };

    const toggleGameActive = (): void => {
      setIsGameActive(!isGameActive);
    };

    const getGameButtonClassName = (gameKey: GameKey): string => {
      const baseClasses = "w-full text-left p-4 rounded-xl transition-custom";
      
      return currentGame === gameKey
        ? `${baseClasses} game-button-selected text-white shadow-lg scale-105`
        : `${baseClasses} bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md hover-scale`;
    };

    const getGameIconClassName = (gameKey: GameKey): string => {
      return currentGame === gameKey ? 'game-icon-selected' : 'game-icon-default';
    };

    const getGameDescriptionClassName = (gameKey: GameKey): string => {
      return `text-sm mt-1 ${
        currentGame === gameKey ? 'opacity-90' : 'text-gray-600'
      }`;
    };

    return (
      <div className={sidebarClassName}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="sidebar-header p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8" />
                <div>
                  <h1 className="text-xl font-bold">LLM Game Hub</h1>
                  <p className="text-sm text-subtle">Chọn trò chơi</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-white/20 rounded"
                type="button"
                aria-label="Close sidebar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Score Display */}
          <div className="p-6 border-b">
            <div className="score-display p-4 rounded-xl text-white text-center">
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-sm opacity-90">Điểm tổng</div>
            </div>
          </div>

          {/* Game Selection */}
          <div className="flex-1 p-6 overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Danh sách trò chơi</h2>
            <div className="space-y-4">
              {Object.entries(gameTypes).map(([key, game]: [string, GameType]) => {
                const gameKey = key as GameKey;
                const IconComponent = game.icon;
                
                return (
                  <button
                    key={key}
                    onClick={() => handleGameSelect(gameKey)}
                    className={getGameButtonClassName(gameKey)}
                    type="button"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${getGameIconClassName(gameKey)}`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base">{game.title}</h3>
                        <p className={getGameDescriptionClassName(gameKey)}>
                          {game.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Game Controls */}
          <div className="game-controls-bg p-6 border-t">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Điều khiển trò chơi</h3>
            <div className="space-y-3">
              <button
                onClick={toggleGameActive}
                className="btn-primary w-full flex items-center justify-center space-x-2 text-white py-3 px-4 rounded-lg font-medium transition-custom transform hover-scale-105"
                type="button"
              >
                {isGameActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{isGameActive ? 'Tạm dừng' : 'Bắt đầu'}</span>
              </button>
              
              <button
                onClick={handleResetScore}
                className="btn-secondary w-full flex items-center justify-center space-x-2 text-white py-3 px-4 rounded-lg font-medium transition-custom transform hover-scale-105"
                type="button"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Làm mới điểm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSidebarToggle = (): void => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = (): void => {
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden llm-game-container">
      <div className="flex h-full">
        {/* Sidebar */}
        <GameSidebar />

        {/* Main Game Screen */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={handleSidebarToggle}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
                aria-label="Open sidebar"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="text-center">
                <h1 className="font-bold text-gray-800">{gameTypes[currentGame]?.title}</h1>
                <div className="mobile-score text-sm font-semibold">Điểm: {score}</div>
              </div>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Game Content */}
          <div className="flex-1 p-4 lg:p-8">
            {renderCurrentGame()}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleSidebarClose}
          role="button"
          tabIndex={0}
          aria-label="Close sidebar overlay"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleSidebarClose();
            }
          }}
        />
      )}
    </div>
  );
};

export default LLMGameContainer;