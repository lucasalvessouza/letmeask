
import { ReactNode } from 'react'
import './styles.scss'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  },
  children?: ReactNode
  isHighlighted: boolean
}

export function Question({content, author, children, isHighlighted}: QuestionProps) {
  return (
    <div className={`question ${isHighlighted ? 'highlighted' : ''}`}>
      <p>
        {content}
      </p>
      <footer>
        <div className='user-info'>
          <img src={author.avatar} alt={author.name} /> 
          <span className='question-author'>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}