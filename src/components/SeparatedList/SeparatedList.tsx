export type ListOption = {
  id: number;
  title: string;
  value: number | string;
};

export type SeparatedListProps = {
  options: ListOption[];
};

const SeparatedList = ({ options }: SeparatedListProps) => {
  return (
    <ul className="list-none grid grid-cols-3 mb-4">
      {options.map((option, index) => {
        const isLastOption = index === options.length - 1;
        let listClasses = "text-center ";
        listClasses += isLastOption ? "" : " border-r border-neutral-700 ";

        return (
          <li key={option.id} className={listClasses}>
            <p className="mb-2">{option.title}</p>
            <p className="text-white text-2xl font-bold">{option.value}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default SeparatedList;
