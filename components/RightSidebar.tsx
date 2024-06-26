import React, { useMemo, useRef, useState } from "react";

import { RightSidebarProps } from "@/types/type";
import { bringElement, modifyShape } from "@/lib/shapes";

import Text from "./settings/Text";
import Color from "./settings/Color";
import Export from "./settings/Export";
import Dimensions from "./settings/Dimensions";
import { ChefHat, MessageCircle } from "lucide-react";

const RightSidebar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (property, value) => {
    if (!isEditingRef.current) isEditingRef.current = true;
    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  const handleChatInputChange = (event) => {
    setChatInput(event.target.value);
  };

  const submitChat = () => {
    const newChat = { id: chatHistory.length + 1, text: chatInput };
    setChatHistory([...chatHistory, newChat]);
    setChatInput(""); // Clear input after sending
    // Here you would add your logic to process the chat message
  };

  const toggleChatPopup = () => {
    setIsChatOpen(!isChatOpen);
  };

  const memoizedContent = useMemo(
    () => (
      <section className='sticky right-0 flex h-full min-w-[227px] select-none flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 max-sm:hidden'>
        <h3 className='px-5 pt-4 text-xs uppercase'>Design</h3>
        <span className='mt-3 border-b border-primary-grey-200 px-5 pb-4 text-xs text-primary-grey-300'>
          Make changes to canvas as you like
        </span>

        <Dimensions
          isEditingRef={isEditingRef}
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
        />

        <Text
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={colorInputRef}
          attribute={elementAttributes.fill}
          placeholder='Color'
          attributeType='fill'
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={strokeInputRef}
          attribute={elementAttributes.stroke}
          placeholder='Stroke'
          attributeType='stroke'
          handleInputChange={handleInputChange}
        />

        <Export />
        {/* Chat icon */}
        <button
          onClick={toggleChatPopup}
          className='absolute bottom-20 right-5 rounded-full  p-3'
        >
         <MessageCircle  className=" w-10 h-10 "/>
        </button>

        {/* Chat popup */}
        {isChatOpen && (
          <div className='fixed bottom-20 right-20 h-96 w-96 rounded-lg bg-white p-4 shadow-lg'>
            <div className='flex h-full flex-col'>
            <div className='mt-2 flex-1 overflow-y-auto'>
                {chatHistory.map((chat) => (
                  <p key={chat.id} className='text-xs text-primary-grey-300'>
                    {chat.text}
                  </p>
                ))}
              </div>
              <input
                type='text'
                value={chatInput}
                onChange={handleChatInputChange}
                placeholder='Ask me anything...'
                className='w-full border border-primary-grey-300 p-2'
              />
              <button
                onClick={submitChat}
                className='mt-2 w-full bg-blue-500 p-2 text-white'
              >
                Send
              </button>
            
            </div>
          </div>
        )}
      </section>
    ),
    [elementAttributes, chatInput, chatHistory, isChatOpen]
  );

  return memoizedContent;
};

export default RightSidebar;
