import { useEffect, useRef, useState } from 'react'

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({ routes, defaultHidden = [] ,defaultActiveIndex = 0, children }) => {

  activeTabLineRef = useRef();
  activeTabRef = useRef();

  let [ isResizeEventAdded, setIsResixeEventAdded ] = useState(false)

  let [ width, setWidth ] = useState(window.innerWidth)

  let [inPageNavIndex, setInPageNavIndex] = useState(null);

  const changePageState = (btn, i) => {
    const { offsetWidth, offsetLeft } = btn;
  
    // Adjust underline element position and width
    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";
  
    // Update state to reflect the active tab index
    setInPageNavIndex(i);
  };
  

  useEffect(() => {

    if( width > 766 && inPageNavIndex != defaultActiveIndex ){
      changePageState(activeTabRef.current, defaultActiveIndex)
    }

    if(!isResizeEventAdded){
      window.addEventListener('resize', () => {
        if(!isResizeEventAdded){
          setIsResixeEventAdded(true)
        }

        setWidth(window.innerWidth)
      })

    }
  }, [width])

  return (
    <>
        <div className='relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto '>
            
            {
              routes.map((route, i) =>{
                return (
                  <button
                  ref={ i== defaultActiveIndex ? activeTabRef : null}
                  key={i} className= {"p-4 px-5 capitalize " + ( inPageNavIndex == i ? "text-dark " : "text-dark-grey " ) + (defaultHidden.includes(route) ? " md:hidden " : "")}
                  onClick={(e) =>{changePageState(e.target, i)}}
                  
                  >
                    {route}
                  </button>
                )
              })
            }
            <hr ref={activeTabLineRef} className='absolute bottom-0 duration-300 border-dark-grey'/>
        
        </div>

        { Array.isArray(children) ? children[inPageNavIndex] : children}
    
    </>
  )
}

export default InPageNavigation