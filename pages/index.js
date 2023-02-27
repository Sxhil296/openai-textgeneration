import { useState } from 'react'
import axios from 'axios'
import OpenAI from 'openai'
import Head from 'next/head'

const openai = new OpenAI(process.env.OPENAI_API_KEY)

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event) => {
    setInputText(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsLoading(true)

    const response = await openai.complete({
      engine: 'davinci',
      prompt: inputText,
      maxTokens: 100,
      n: 1,
      stop: '\n',
    })

    setOutputText(response.data.choices[0].text)
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto py-10">
      <Head>
        <title>OpenAI Text Generation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4">
          Generate Text with OpenAI
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            className="border border-gray-400 p-2 w-full h-32 mb-4 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter some text..."
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        {outputText && (
          <div className="border border-gray-400 p-4 rounded-md mb-4">
            <p className="text-lg">{outputText}</p>
          </div>
        )}
      </main>
    </div>
  )
}
