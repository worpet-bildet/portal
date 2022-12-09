import Urbit from '@urbit/http-api';
import React from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { redirect } from 'react-router-dom';
import { IconImageInput } from '../../components/IconImageInput';
import { Sidebar } from '../../components/Sidebar';
import { Tag } from '../../components/Tag';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

export function UploadApplication(props) {
  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <main className="basis-3/4 flex items-center w-full justify-center min-h-screen">
        <div className="w-4/5 space-y-6 py-14">
          <h1 className="text-3xl font-bold">Upload an application</h1>
          <div className="border border-grey-200 rounded p-8">
            <Form />
          </div>
        </div>
    </main>
    </div>
);
}

function Form(props) {
  const methods = useForm({
    defaultValues: {
      "app-name": "",
      "dev-input": {
        description: "",
        screenshots: ['Introduce a url'],
        keywords: [],
        "dst-desk": "~zod/name-desk"
      }
    }
  });
  const { handleSubmit, watch } = methods;
  const watchAllFields = watch();
  const onSubmit = (data) => {
    submitNew(data);
    return redirect('/apps/app-store/dev');
  };

  const submitNew = (appPage) => {
    api.poke({
      app: "dev-server",
      mark: "app-store-dev-action",
      json: { add: appPage },
      onSuccess: () => console.log('Successfully done'),
      onError: () => setErrorMsg("Va a ser que no"),
    });
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  return (
    <FormProvider {...methods}> 
      <AppPageInformation/>
      <Signature />
      <Docket />
      <button
        type="submit"
        className="block ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
        onClick={handleSubmit(onSubmit)}
      >save</button>
    </FormProvider>
  );
}

function AppPageInformation(props) {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name:"dev-input.screenshots"
  })

  return (
    <div>
      <div className='mb-6'>
        <div className='flex flex-row gap-14'>
        <IconImageInput />
        <div className='w-full'>
          <div className="flex flex-row gap-10">
            <div className="mb-3 basis-1/2">
              <Input name='app-name' label="Application name" {...register('app-name')} />
            </div>
            <div className="mb-3 basis-1/2">
              <Controller
                name="dev-input.keywords"
                control={control}
                render={({field: { ref, onChange, ...field }}) => (
                  <ArrayInput
                    {...field}
                    name="keywords"
                    label="Keywords"
                    placeholder="something something"
                  />
                  )
                }
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-800" name="description">Description</label>
            <textarea
              name="description"
              rows="10"
              className="border border-gray-800 text-gray-800 text-sm  focus:ring-gray-900 focus:border-gray-900 block w-full"
              {...register('dev-input.description')}
            >
            </textarea>
          </div>
        </div>
      </div>
      </div>
      <ul className='flex flex-col gap-3 mb-6 w-full'>
        { fields.map((field, index) => (
            <li key={field.id} className="flex w-full">
              <ImageInput
                name={`Screenshot ${index}`}
                label={`Screenshot ${index}`}
                index={index}
                onClick={remove}
                {...register(`dev-input.screenshots.${index}`)}
              />
            </li>
          ))
        }
        <button
          type="button"
          className='block ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white px-5'
          onClick={() => append('Introduce a new url')}
        >Add Screenshot</button>
      </ul>
      <Input label="Distributor desk" placeholder="~sampel/desk?" {...register('dev-input.dst-desk')}/>
    </div>
  );
}

function Signature(props) {
  return (
    <div className='mb-3'>
      <h2 className='text-xl font-semibold mb-4 mt-10'>Signature</h2>
      <div className="flex flex-row gap-10">
        <div className="mb-3 basis-1/2">
          <Input label="Ship" placeholder="sampel-palnet" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Life" />
        </div>
      </div>
      <Input label="Sig" />
    </div>
  );
}

function Docket(props) {
  return (
    <div className='mb-6'>
      <h2 className='text-xl font-semibold mb-4 mt-10'>Docket</h2>
      <div className="grid grid-cols-2 gap-x-8">
        <div className="mb-3 basis-1/2">
          <Input label="Title" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Info" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Color" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Href" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Image" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Version" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Website" />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="License" />
        </div>
      </div>
    </div>
  );
}

const Input = React.forwardRef(({label, name, placeholder, ...rest}, ref) => {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800" htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        className="border border-gray-800 text-gray-800 text-sm focus:ring-gray-900 focus:border-gray-900 w-full p-1.5"
        placeholder={placeholder}
        {...rest}
        ref={ref}
      />
    </div>
  );
});

const ArrayInput = React.forwardRef(({label, name, placeholder, ...rest}, ref) => {
  const { setValue, getValues } = useFormContext();
  const setArrayValues = (value) => {
    const previousValue = getValues('dev-input.keywords');
    let currentValue;
    currentValue = value.split(' ');
    if(previousValue.length > 1) {
      currentValue = currentValue.join().split(',');
    }
    setValue('dev-input.keywords', currentValue)
  }
  return (
    <>
      <div>
        <label className="text-sm font-semibold text-gray-800" htmlFor={name}>{label}</label>
        <input
          name={name}
          type="text"
          className="border border-gray-800 text-gray-800 text-sm  focus:ring-gray-900 focus:border-gray-900 w-full p-1.5"
          placeholder={placeholder}
          onChange={(e) => setArrayValues(e.target.value)}
          {...rest}
          ref={ref}
        />
      </div>
      <ul className='flex justify-start gap-x-1 flex-wrap'>
        { getValues('dev-input.keywords')
          ? getValues('dev-input.keywords').map((keyword, index) => <Tag key={keyword + index} name={keyword} />)
          : null
        }
      </ul>
    </>
  );
});

const ImageInput = React.forwardRef(({name, label, placeholder, onClick, index, ...rest}, ref) => {
  return (
    <div className='flex flex-col w-full'>
      <label className="text-sm font-semibold text-gray-800" htmlFor={name}>{label}</label>
      <div className='flex w-full'>
        <input
          name={name}
          className="w-full text-xs text-gray-900 border border-gray-900 focus:ring-gray-900 focus:border-gray-900"
          type="text"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
        <button
          type="button"
          className='block font-bold border-2 border-black hover:bg-gray-800 hover:text-white px-5'
          onClick={() => onClick(index)}
        >Delete</button>
      </div>
    </div>
  );
});