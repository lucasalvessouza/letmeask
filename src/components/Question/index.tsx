
import { ReactNode } from 'react'
import cx from 'classnames'
import './styles.scss'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  },
  children?: ReactNode
  isHighlighted: boolean
  isAnswered: boolean
}

export function Question({
  content, author, children, isHighlighted, isAnswered
}: QuestionProps) {
  return (
    <div className={cx(
      'question',
      { 'highlighted': isHighlighted && !isAnswered },
      { 'answered': isAnswered }
    )}>
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