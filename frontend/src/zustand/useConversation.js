import {create} from 'zustand';

// we can have access of this conversation throught our app, without passing prop

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation)=> set({selectedConversation}),
    messages: [],
    setMessages: (messages) => set({messages}),
}))

export default useConversation;
