import type { PrimerComment } from '../../types/content'
import { ChatIcon, HeartIcon, PersonCircleIcon } from '../icons/IconLibrary'

interface CommentsSectionProps {
  comments: PrimerComment[]
}

const CommentsSection = ({ comments }: CommentsSectionProps) => {
  return (
    <div style={{ marginTop: '2rem', paddingTop: '1.5rem' }}>
      <h4
        style={{
          fontSize: '1.25rem',
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          borderTop: '1px solid var(--border-primary)',
          paddingTop: '1rem',
        }}
      >
        Comments
      </h4>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <button className="comments-join-btn" type="button">
          <PersonCircleIcon style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} />
          Join the Discussion
        </button>
      </div>
      <div>
        {comments.map((comment) => (
          <CommentItem key={comment.date + comment.user.name} comment={comment} />
        ))}
      </div>
    </div>
  )
}

interface CommentItemProps {
  comment: PrimerComment
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="comment-item">
      <div className="comment-item-avatar">
        {comment.user.avatar ? (
          <img src={comment.user.avatar} alt={`${comment.user.name}'s avatar`} />
        ) : (
          <PersonCircleIcon />
        )}
      </div>
      <div style={{ flexGrow: 1 }}>
        <div style={{ fontWeight: 600 }}>{comment.user.name}</div>
        <div className="comment-item-content">{comment.content}</div>
        <div className="comment-item-date">{comment.date}</div>
        <div className="comment-item-actions">
          <button type="button">
            <HeartIcon />
            <span></span>
          </button>
          <button type="button">
            <ChatIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentsSection
