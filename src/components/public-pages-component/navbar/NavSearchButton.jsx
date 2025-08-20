import { MdSearch } from "react-icons/md";

const NavSearchButton = () => {
  return (
    <button
      type="button"
      className="rounded-full border border-white p-[6px] bg-primary-400"
    >
      <MdSearch size={24} color="#fff" />
    </button>
  );
};

export default NavSearchButton;
