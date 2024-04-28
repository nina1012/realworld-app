import { InputField } from '@/components/form/input-field';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { FiX } from 'react-icons/fi';

export type TagInputProps = {
  tagList: string[];
  error: FieldError;
};

export const TagInput = ({ tagList }: TagInputProps) => {
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>(
    tagList || []
  );

  const changeTagInput = (
    e: React.FormEvent<HTMLInputElement>
  ) => setTag(e.currentTarget.value);

  const handleTagInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (
      e.key // because e.key is giving a string, this way I converted it to number
    ) {
      case 'Enter': // Enter
      case 'Tab': // Tab
      case ',': // Comma
        if (+e.key !== 9) e.preventDefault();
        addTag(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const addTag = (tag: string) => {
    if (!!tag) {
      tagList.push(tag);
      setTag('');
    }
  };
  const removeTag = (tag: string) => {
    setTag('');
    setTags(tags.filter((t) => (tag === t ? '' : t)));
    return tags;
  };

  return (
    <>
      <fieldset className="bg-white mb-4 text-left w-full">
        <input
          className="border-[1px] border-gray-200 overflow-hidden w-full text-xl rounded px-6 py-3 mb-4"
          type="text"
          placeholder="Add tag(press tab to add 2 or more tags)"
          value={tag}
          onChange={changeTagInput}
          onKeyDown={handleTagInputKeyDown}
        />

        <div className="tag-list flex gap-1">
          {tags.map((tag, index) => (
            <span
              className="bg-gray-700 inline-flex items-center rounded-full text-white px-2 py-1 !text-center"
              key={index}
            >
              <FiX
                className="hover:text-red-400"
                onClick={() => removeTag(tag)}
              />
              {tag}
            </span>
          ))}
        </div>
      </fieldset>
    </>
  );
};
