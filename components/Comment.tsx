import { CommentDetailsProps } from "@/utils/typings"
import IGlogo from '@/assets/IG-logo.png'
import Image from "next/image"
import moment from "moment"

function Comment({comment}: {comment: CommentDetailsProps}) {
    const createdAt = comment.createdAt?.toMillis()
    const convertedTimestamp = moment(createdAt)?.fromNow()
    return (
        <div className  ='w-full mt-2'>
            <div className = 'w-full flex items-center space-x-2 p-1'>
                <Image src = {IGlogo} alt={comment.userImage} className ='flex-shrink-0 rounded-full object-contain' width={35} height={35} />
                <div className = 'w-full flex flex-col justify-center flex-grow'>
                    <p className="text-xs font-semibold text-gray-700">{comment?.userName} | <span className ='text-xs font-medium text-gray-600'>@{comment?.userName?.replace(/\s/g, '_').toLowerCase()} </span> | <span className ='text-gray-600 font-sembold text-xs'>{convertedTimestamp}</span></p>
                    <p className='text-sm text-gray-700 font-medium '>{comment.comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment