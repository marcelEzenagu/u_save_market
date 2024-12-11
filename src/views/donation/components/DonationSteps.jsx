import React,{useState,useMemo} from "react";



export default function DonationSteps({ steps }) {
  const [active, setActive] = useState(steps[0]?.id); // Set the first tab as active by default
  
  
  const activeTab = useMemo(() => steps.find(tab => tab.id === active), [active, steps]);

  // Function to move to the next step
  const getCurrentStepIndex = () => steps.findIndex(step => step.id === active);

  // Function to move to the next step
  const goToNextStep = () => {
    const currentIndex = getCurrentStepIndex();

    console.log(currentIndex,"currentIndex")
    if (currentIndex < steps.length - 1) {
      setActive(steps[currentIndex + 1].id);
    }
  };
  return (
    <div className="flex flex-col mt-11 max-w-full leading-none w-[670px] max-md:mt-10">
      <div className="flex z-10 gap-10 items-center text-lg leading-loose text-center text-zinc-500">
        {steps.map((step) => (
          <div key={step.id} className="flex cursor-pointer flex-col self-stretch my-auto whitespace-nowrap w-[197px]">
            <div
                  onClick={() => setActive(step.id)}

                  className={`text-regal-light-gray text-nowrap text-xs md:px-8 after:scale-x-0 ${
                    active === step.id
                        ? "text-regal-sky-blue after:scale-x-100 font-[600]"
                        : ""
                } relative after:content-[''] after:absolute after:left-0 after:bottom-[-15px] after:w-full after:h-[4px] after:bg-regal-sky-blue after:rounded-full after:origin-left after:transition-transform after:duration-300 after:ease-in-out`}
            
            >
              {step.label}
            </div>
            <div className="flex mt-3 w-full bg-sky-600 rounded min-h-[4px]" />
          </div>
        ))}
      </div>
    <div>
    {activeTab ? activeTab.component : null}
                </div>

                   
      <button 
        onClick={goToNextStep}

        type="submit"
        className="flex overflow-hidden flex-col justify-center items-center px-20 py-3 mt-8 max-w-full text-base text-center text-white whitespace-nowrap bg-sky-600 rounded-lg min-h-[48px] w-[670px] max-md:px-5
        "
        aria-label="Proceed to next step"

        disabled={active === steps[steps.length - 1].id}
      >
        Next
      </button>
    </div>
  );
}


 