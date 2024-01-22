"use client";
import IGLogo from "@/assets/IG-logo.png";
import Image from 'next/image'
import { IGPostsCollectionRef, storage } from "@/firebase-config";
import { OpenPostModal, ClosePostModal } from "@/redux/features/PostModalSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { InitialPostDetailsProps, PostDetailsProps } from "@/utils/typings";
import { Dialog, Transition } from "@headlessui/react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Timestamp, addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, Fragment, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { v4 } from "uuid";
import { useSession } from "next-auth/react";

export default function MyModal() {
  const {data: session} = useSession()
  const modalState = useAppSelector(
    (state) => state.PostModalSlice.value.postModalState
  );
  const dispatch = useDispatch<AppDispatch>();
  const [inputText, setInputText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isInputLocked, setIsInputLocked] = useState<boolean>(false)

  const postDetails: InitialPostDetailsProps = {
    postText: inputText,
    userName: session?.user?.name ?? '',
    userImage: session?.user?.image as string ?? '',
    postImage: image,
    userEmail: session?.user?.email ?? '',
    createdAt: serverTimestamp(),
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    const file = files[0];
    const imageRef = ref(storage, `IG-images/${file.name + v4()}`);
    try {

      await uploadBytes(imageRef, file);
    const imageURL = await getDownloadURL(imageRef);
    console.log(imageURL);
    setImage(imageURL);
  } catch (err) {
    toast.error('Network Error: Image Upload Unsuccessful')
    console.log('Error: ', err)
  }
  };

  async function SendPost() {
    if (!inputText) return;
    try {
      setIsInputLocked(true)
      await addDoc(IGPostsCollectionRef, postDetails);
      toast.success('Post Uploaded Successfully')
      dispatch(ClosePostModal());
    } catch(err) {
      toast.error('Network Error: Upload Unsuccessful, please check your internet connection.')
    console.log('Error: ', err)
    }
    setIsInputLocked(false)
    setInputText('')
    setImage('')
  }
  return (
    <>
      <Transition appear show={modalState} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(ClosePostModal())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    {image ?<div onClick={() => setImage('')} className ='w-full h-60 hover:scale-105 transition transform duration-100 cursor-pointer hoveposr:animate-pulse relative overflow-hidden rounded-md'><Image src = {image} fill className ='object-contain rounded-md' alt = {image}  /></div> : <div
                      onClick={() => imageInputRef.current?.click()}
                      className="w-full h-52 rounded-lg bg-gray-300 group duration-100 transform cursor-pointer transition ease-in-out flex items-center justify-center hover:scale-105"
                    >
                      <PhotoIcon className="w-11 h-11 text-gray-100 group-hover:text-neutral- group-hover:scale-150 duration-200 transition transform group-hover:rotate-6" />
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        ref={imageInputRef}
                        hidden
                      />
                    </div>}
                    <div className="mt-3 flex items-center space-x-1">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setInputText(e.target.value)
                        }
                        id="default-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none w-full py-3 px-2.5 flex-1"
                      />
                      <FaceSmileIcon className="text-neutral-800 h-7 w-7 cursor-pointer transition transform ease-in-out duration-100 hover:scale-105" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      disabled={!inputText || isInputLocked}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-100 px-4 py-3 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={SendPost}
                    >
                     {isInputLocked ? 'Uploading' : 'Upload Post!'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
