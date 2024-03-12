import { Composer } from '../types';
import { composerNameDisplay } from '../utilities';
import { AInput } from './AInput';

interface BookFormProps {
  onSuccessCallback?: () => void;
  composers: Composer[];
}
export const BookForm = ({ onSuccessCallback, composers }: BookFormProps) => {
  const onSubmitClick = async () => {};

  return (
    <section className="flex flex-col w-1/2 p-2 items-center">
      <AInput id="newBookTitle" labelText="Title" required />
      <AInput id="newBookPublisher" labelText="Publisher" />
      <AInput id="newBookVolumeInfo" labelText="Volume Info" />
      <AInput id="newBookIsbn" labelText="ISBN" />
      <AInput id="newBookDescription" labelText="Description" />
      <div className="input-container">
        <label htmlFor="newBookComposer">Composer</label>
        <select id="newBookComposer" className="input">
          <option value="0">(none)</option>
          {composers.map((c) => (
            <option value={c.composerId} key={c.composerId}>
              {composerNameDisplay(c, true)}
            </option>
          ))}
        </select>
      </div>
      <button className="btn mt-4">Submit Book</button>
    </section>
  );
};
