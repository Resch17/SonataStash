import { Composer } from '../types';
import { composerNameDisplay } from '../utilities';

interface ComposerListProps {
  composers: Composer[];
  selectedComposer: Composer | undefined;
  setSelectedComposer: React.Dispatch<
    React.SetStateAction<Composer | undefined>
  >;
}
export const ComposerList = ({
  composers,
  selectedComposer,
  setSelectedComposer,
}: ComposerListProps) => {
  const composerListItemClass = (composer: Composer) => {
    let baseClass = 'cursor-pointer merriweather-regular text-xl';
    if (selectedComposer?.composerId === composer.composerId) {
      baseClass += ' !font-black';
    }
    return baseClass;
  };

  return (
    <section
      className={`flex flex-col w-1/2 p-2 ${
        selectedComposer && 'text-right pr-48'
      }`}
    >
      {selectedComposer && (
        <button
          className="btn max-w-sm mb-4 ml-auto"
          onClick={() => setSelectedComposer(undefined)}
        >
          New Composer
        </button>
      )}
      <ul className="space-y-2 pl-6">
        {composers.map((c) => (
          <li
            onClick={() => {
              setSelectedComposer(c);
            }}
            key={c.composerId}
            className={composerListItemClass(c)}
          >
            {composerNameDisplay(c)}
          </li>
        ))}
      </ul>
    </section>
  );
};
