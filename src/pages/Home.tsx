import { CustomButton } from "../components";

export const Home = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex gap-x-10 items-center">
        <CustomButton
          color="light-primary"
          onClick={() => console.log("Click")}
        >
          Primary
        </CustomButton>
        <CustomButton
          color="light-secondary"
          onClick={() => console.log("Click")}
        >
          Secondary
        </CustomButton>
        <CustomButton
          color="light-success"
          onClick={() => console.log("Click")}
        >
          Success
        </CustomButton>
        <CustomButton
          color="light-warning"
          onClick={() => console.log("Click")}
        >
          Warning
        </CustomButton>
        <CustomButton color="light-error" onClick={() => console.log("Click")}>
          Error
        </CustomButton>
      </div>
      <div className="flex gap-x-10 items-center">
        <CustomButton color="dark-primary" onClick={() => console.log("Click")}>
          Primary
        </CustomButton>
        <CustomButton
          color="dark-secondary"
          onClick={() => console.log("Click")}
        >
          Secondary
        </CustomButton>
        <CustomButton color="dark-success" onClick={() => console.log("Click")}>
          Success
        </CustomButton>
        <CustomButton color="dark-warning" onClick={() => console.log("Click")}>
          Warning
        </CustomButton>
        <CustomButton color="dark-error" onClick={() => console.log("Click")}>
          Error
        </CustomButton>

        <CustomButton
          color="custom"
          className="bg-[#8b5cf6] text-white border-[#8b5cf6]" // violeta Tailwind
          onClick={() => alert("Custom!")}
        >
          Custom Button
        </CustomButton>
      </div>
    </div>
  );
};
