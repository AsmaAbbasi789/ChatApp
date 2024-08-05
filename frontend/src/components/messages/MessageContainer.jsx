import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";


const MessageContainer = () => {

	const {selectedConversation , setSelectedConversation} = useConversation();
	
	useEffect(()=> {

		return ()=> {
			setSelectedConversation(null);
		}
	}, [setSelectedConversation])

	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{
				!selectedConversation ? (
					<NoChatSelected/>
				) : (
			<>
				{/* Header */}
				<div className='bg-slate-200 px-4 py-2 mb-2'>
					<div className="flex ">
						<img className='w-12 rounded-full' src={selectedConversation.profilePic} alt="profile pic" /> 
						<span className='text-gray-900 font-bold pl-3 pt-3'>{selectedConversation.fullName}</span>
					</div>
				</div>

				<Messages />
				<MessageInput />
			</>
			)
		}
		</div>
	);
};
export default MessageContainer;


const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName} ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
