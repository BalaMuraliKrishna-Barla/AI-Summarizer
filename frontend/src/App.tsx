import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TextArea } from './components/TextArea';
import { Button } from './components/Button';
import { Copy, CheckCircle2, Loader } from 'lucide-react'; 

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleSummarize = async () => {
    if (inputText.length < 200) {
      setError('Please enter at least 200 characters');
      return;
    }

    setError(null);
    setIsLoading(true);

    const bodyContent = JSON.stringify({ text_to_summarize: inputText });

    try {
      // Call your API endpoint
      const response = await fetch('https://minimizer-server.onrender.com/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: bodyContent,
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const summaryResponse = await response.text();
      setSummary(summaryResponse);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setError('Sorry, something went wrong. Please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar isDark={isDark} onToggleTheme={handleToggleTheme} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            AI Text Summarizer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Transform lengthy content into concise, meaningful summaries with the power of AI.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8">
          <TextArea
            value={inputText}
            onChange={setInputText}
            placeholder="Paste your text here (minimum 200 characters)..."
            label="Input Text"
          />

          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-2">
              {error}
            </p>
          )}

          <div className="flex justify-center">
            <Button
              onClick={handleSummarize}
              isLoading={isLoading}
              disabled={inputText.length < 200 || isLoading} // Disable button if less than 200 characters or loading
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader className="animate-spin w-4 h-4 mr-2" /> {/* Loading spinner */}
                  Please wait...
                </div>
              ) : (
                'Summarize Text'
              )}
            </Button>
          </div>

          {summary && (
            <div className="relative mt-8">
              <TextArea
                value={summary}
                onChange={() => {}}
                placeholder=""
                label="Summary"
                readOnly
              />
              <button
                onClick={copyToClipboard}
                className="absolute top-8 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="Copy to clipboard"
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AI Text Summarizer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
