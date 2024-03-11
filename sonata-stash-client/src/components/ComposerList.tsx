import { Composer } from '../types';

interface ComposerListProps {
  composers: Composer[];
}
export const ComposerList = ({ composers }: ComposerListProps) => {
  const composerNameDisplay = (composer: Composer) => {
    let name = '';
    if (!composer.firstName) {
      name = composer.lastName;
    } else {
      name = composer.firstName + ' ' + composer.lastName;
    }
    if (composer.nationality) {
      name += ` - ${composer.nationality}`;
    }
    return name;
  };

  return (
    <section className="flex flex-col w-1/2 p-2">
      <ul>
        {composers.map((c) => (
          <li key={c.composerId}>{composerNameDisplay(c)}</li>
        ))}
      </ul>
    </section>
  );
};
