import Link from "next/link";
import { CgArrowLongRight } from "react-icons/cg";

const ButtonMain = () => {
  return (
    <Link href="./contact">
      <button className="main__button font-OldburgDisplayB text-black before:bg-red-500">
        BOOK A TEST DRIVE
        <CgArrowLongRight className="main__button-icon" size={20} />
      </button>
    </Link>
  );
};

export default ButtonMain;
