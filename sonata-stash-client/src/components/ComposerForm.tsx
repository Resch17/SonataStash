import { addComposer } from '../services/composerService';
import { Composer } from '../types';
import { positiveOrNull, trimmedOrNull } from '../utilities';
import { AInput } from './AInput';

interface ComposerFormProps {
  onSuccessCallback?: () => void;
}
export const ComposerForm = ({ onSuccessCallback }: ComposerFormProps) => {
  const onSubmitClick = async () => {
    const lastNameEl = document.getElementById(
      'newComposerLastName'
    ) as HTMLInputElement;
    const firstNameEl = document.getElementById(
      'newComposerFirstName'
    ) as HTMLInputElement;
    const birthYearEl = document.getElementById(
      'newComposerBirthYear'
    ) as HTMLInputElement;
    const deathYearEl = document.getElementById(
      'newComposerDeathYear'
    ) as HTMLInputElement;
    const nationalityEl = document.getElementById(
      'newComposerNationality'
    ) as HTMLInputElement;

    if (lastNameEl!.value.trim().length < 1) {
      window.alert('Invalid Composer');
      return;
    }

    const newComposer: Composer = {
      composerId: 0,
      lastName: lastNameEl.value,
      firstName: firstNameEl.value,
      nationality: nationalityEl.value,
      birthYear: birthYearEl.valueAsNumber,
      deathYear: deathYearEl.valueAsNumber,
    };
    try {
      await addNewComposer(newComposer);
      lastNameEl.value = '';
      firstNameEl.value = '';
      nationalityEl.value = '';
      birthYearEl.value = '';
      deathYearEl.value = '';
      if (onSuccessCallback) onSuccessCallback();
    } catch {
      window.alert('Something went wrong!');
      return;
    }
  };

  const addNewComposer = async (newComposer: Composer) => {
    const createdId = await addComposer({
      firstName: trimmedOrNull(newComposer.firstName),
      lastName: newComposer.lastName.trim(),
      birthYear: newComposer.birthYear,
      deathYear: positiveOrNull(newComposer.deathYear),
      nationality: newComposer.nationality?.trim(),
    });
    console.info('Created new composer. ID: ' + createdId);
  };

  return (
    <section className="flex flex-col w-1/2 p-2 items-center">
      <AInput id="newComposerFirstName" labelText="First Name" />
      <AInput id="newComposerLastName" labelText="Last Name" required />
      <AInput id="newComposerBirthYear" type="number" labelText="Birth Year" />
      <AInput id="newComposerDeathYear" type="number" labelText="Death Year" />
      <AInput id="newComposerNationality" labelText="Nationality" />
      <button className="btn mt-4" onClick={onSubmitClick}>
        Submit Composer
      </button>
    </section>
  );
};
