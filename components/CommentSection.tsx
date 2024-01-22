"use client";
import { db } from "@/firebase-config";
import {
  CommentDetailsProps,
  InitialCommentDetailsProps,
} from "@/utils/typings";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Comment from "./Comment";
import { useSession } from "next-auth/react";

function CommentSection({ postId }: { postId: string }) {
  const [commentInput, setCommentInput] = useState<string>("");
  const commentsCollectionRef = collection(
    db,
    "Instagram-Posts",
    postId,
    "Comments"
  );
  const {data: session} = useSession()
   const [showErrMsg, setShowErrMsg] = useState<boolean>(false)
  const [isCommentLocked, setIsCommentLocked] = useState<boolean>(false);
  const commentDetails: InitialCommentDetailsProps = {
    userName: session?.user?.name ?? '',
    userImage: session?.user?.image as string ?? '',
    userEmail: session?.user?.email ?? '',
    comment: commentInput,
    createdAt: serverTimestamp(),
  };
  const [comments, setComments] = useState<CommentDetailsProps[]>([]);
  async function UploadComment(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    console.log('clicked')
    if (!commentInput) return;
    setIsCommentLocked(true);
    try {
      await addDoc(commentsCollectionRef, commentDetails);
      setShowErrMsg(false)
      setCommentInput('');
    } catch (err) {
      setShowErrMsg(true)
      console.log("Error: ", err);
    }
    setIsCommentLocked(false);
  }

  useEffect(() => {
      const fetchComments = async () => {
      const fetchCommentsQuery = query(
        commentsCollectionRef,
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(fetchCommentsQuery);
      const queryData = querySnapshot.docs.map(
        (doc) =>
          ({
            commentId: doc.id,
            ...doc.data(),
          } as CommentDetailsProps)
          );
          setComments(queryData);
        };
        
        fetchComments();
    }, [comments]);
  
  return (
    <>
        <div className="mt-1">
        {comments.length > 1 && <p className = 'text-gray-500 text-sm'>View all {comments.length} comments</p>}
          {session && <form className="flex items-center space-x-2 shadow-sm">
          <div className = 'fle flex-col flex-1 items-start justify-start'>
            
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCommentInput(e.target.value)
              }
              value={commentInput}
              placeholder="Add a comment..."
              className="flex-1 p-2 bg-transparent text-sm placeholder:text-sm text-gray-700 placeholder:font-normal border-none outline-none placeholder:text-gray-500"
            />
            {showErrMsg && <p className = 'text-[10px] text-red-500 font-semibold'>Error uploading comment, Please try again.</p>}
 
 </div>
              <button
                onClick={UploadComment}
                className="cursor-pointer disabled:font-medium hover:text-gray-800 duration-100 transition text-blue-600 font-semibold text-sm disabled:opacity-60"
                type="submit"
                disabled={!commentInput || isCommentLocked}
              >
                {isCommentLocked ? 'Posting' : 'Post'}
              </button>
            <FaceSmileIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-300" />
          </form>}
      {comments.length > 0 && (
          <div className ='w-full max-h-28 overflow-y-scroll scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent scrollbar-thumb-rounded-full'>
            {comments?.map((comment)  => 
              <Comment key={comment.commentId} comment={comment} />
            )}
          </div>)}
          </div>
    </>
  );
}

export default CommentSection;
