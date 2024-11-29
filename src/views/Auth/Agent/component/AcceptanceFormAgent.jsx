import React from "react";

function AcceptanceFormAgent({setData,body}) {
  console.log("BODY=AcceptanceFormAgent=",body)
  const handleChange = (event) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      "hasAcknowledged":body.hasAcknowledged?  !body.hasAcknowledged:true
    }));
  };
  return (
    <div className="animated fadeInDown ">
      {" "}
      <div className="md:w-[450px] mx-auto">
      <h1 className="text-2xl md:text-[30px] font-bold text-center mb-5 w-[350px] mx-auto ">
        Acceptance Documents
      </h1>
      {/* Description Text */}
      <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum
        elit eget purus suscipit, sed egestas 
      </p>
      </div>
        <div className="mt-4 md:w-[550px] mx-auto">
        <div className="flex flex-col gap-3 text-regal-black mb-8 font-[400] text-xs md:text-sm">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales ipsum suscipit placerat pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis a metus interdum, sodales risus ut, dapibus augue. Suspendisse tellus turpis, cursus id congue at, ornare tincidunt sapien. Nunc laoreet venenatis commodo. Duis vestibulum, odio in lacinia luctus, lacus quam scelerisque justo, id ullamcorper erat nisi eget ante. Donec ultrices iaculis vulputate. Aliquam vulputate elit non libero volutpat, at aliquet tortor eleifend. Morbi sed dolor sit amet tellus vehicula consectetur sit amet quis ipsum.</p>
            
            <p>Phasellus vel cursus elit, nec ornare libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla ligula turpis, tincidunt eget tortor quis, molestie feugiat lorem. Nulla non ipsum et tellus elementum ornare. Mauris vel tincidunt arcu, a suscipit sapien. Pellentesque finibus nisl pretium, tincidunt quam eget, pulvinar nulla. Suspendisse commodo velit at condimentum varius. Pellentesque dolor sapien, euismod eget risus quis, faucibus sodales odio. Curabitur tortor enim, semper sed vulputate feugiat, fermentum at nibh. Pellentesque ultrices gravida dolor ac eleifend. Integer eget mollis odio.</p>

            <p>Pellentesque sit amet laoreet purus. Aenean augue purus, egestas a condimentum id, convallis in dui. Nunc ullamcorper varius orci, id finibus mauris rhoncus non. Sed vitae orci at libero porta tempus at non lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam viverra cursus ipsum ac rutrum. Nam tempor posuere arcu. Vivamus eget augue massa.</p>
        </div>

        <div className="terms-checkbox flex items-center gap-1 mb-20">
            <input type="checkbox"  
              id="terms"
              value={body.hasAcknowledged}
              onChange={handleChange}
              name="terms" className=" p-3 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-md bg-transparent text-regal-black" />
            <label htmlFor="terms" className=" text-xs md:text-sm">I accept the terms & conditions</label>
        </div>
        </div>
    </div>
  );
}

export default AcceptanceFormAgent;
