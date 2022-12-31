import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import { Input } from '../../components/Input';
import { Sidebar } from '../../components/Sidebar';
import { Tag } from '../../components/Tag';
import { TextAreaInput } from '../../components/TextAreaInput';
import { getUrbitApi } from '../../utils/urbitApi';

const api = getUrbitApi();

export function UploadApplication(props) {
  const {application} = useParams();
  const [appInfo, setAppInfo] = useState();

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      api.subscribe({
        app: "dev-server",
        path: "/render",
        event: handleUpdate,
        err: () => setErrorMsg("Subscription rejected"),
        quit: () => setErrorMsg("Kicked from subscription"),
        cancel: () => setErrorMsg("Subscription cancelled"),
      });
    } catch {
      setErrorMsg("Subscription failed");
    }
  };

  const handleUpdate = (devApps) => {
    const currentApp = getApplications(devApps).find((app) => app.key['app-name'] == application);
    setAppInfo(currentApp);
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const getApplications = (developerApps) => {
    return developerApps['dev-map'];
  }

  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <main className="ml-32 basis-3/4 w-full min-h-screen">
        <div className="w-4/5 space-y-6 py-14">
          <h1 className="text-3xl font-bold">
            { application ? `Edit ${application}` : 'Upload an application' }
          </h1>
          <div className="border border-grey-200 rounded p-8">
            <Form application={appInfo} name={application}/>
          </div>
        </div>
    </main>
    </div>
);
}

function Form({application, name}) {
  const navigate = useNavigate();
  const [disableForm, setDisableForm] = useState(false);
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
  const { handleSubmit, watch, setValue } = methods;
  const watchAllFields = watch();

  useEffect(() => {
    if(application) {
      setValue('app-name', name);
      setValue('dev-input.description', application.description);
      setValue('dev-input.dst-desk', application['dst-desk']);
      setValue('dev-input.keywords', application.keywords);
      setValue('dev-input.screenshots', application.screenshots);
    }
  }, [application]);

  const onSubmit = (data) => {
    if (application) {
      executeAction('edit', data);
      return;
    }
    executeAction('add', data);
  };

  const executeAction = (action, appPage) => {
    api.poke({
      app: "dev-server",
      mark: "app-store-dev-action",
      json: { [action]: appPage },
      onSuccess: () => console.log('Successfully done'),
      onError: () => setErrorMsg("Va a ser que no"),
    });
    redirectToMain();
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const redirectToMain = () => navigate('/apps/app-store/dev/');

  return (
    <FormProvider {...methods}> 
      <AppPageInformation setDisableForm={setDisableForm}/>
      <div className='mt-5 flex justify-items-end'>
        <button
            type="button"
            className="block ml-auto font-bold text-gray-500 py-0.5 px-5"
            onClick={redirectToMain}
          >
          CANCEL
        </button>
        <button
          type="button"
          className="block font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
          onClick={handleSubmit(onSubmit)}
          disabled={disableForm}
        >
        { application ? 'edit' : 'save' }
        </button>
      </div>
      { application ?
        (<>
          <Signature {...application.signature}/>
          <Docket {...application.docket}/>
        </>)
        :null }
    </FormProvider>
  );
}

function AppPageInformation({setDisableForm}) {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name:"dev-input.screenshots"
  })

  return (
    <div>
      <div className='mb-6'>
        <div className='flex flex-row gap-14'>
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
                    setDisableForm={setDisableForm}
                  />
                  )
                }
              />
            </div>
          </div>
          <TextAreaInput name="description" label="Description" rows="10" {...register('dev-input.description')}/>
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
      <Input label="Distributor desk" placeholder="~sampel/{your app name}" {...register('dev-input.dst-desk')}/>
    </div>
  );
}

function Signature({p, q, r}) {
  return (
    <div className='mb-3'>
      <h2 className='text-xl font-semibold mb-4 mt-10'>Signature</h2>
      <div className="flex flex-row gap-10">
        <div className="mb-3 basis-1/2">
          <Input label="Ship" placeholder={q} disabled={true} />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Life" placeholder={r} disabled={true} />
        </div>
      </div>
      <Input label="Sig" placeholder={p} disabled={true} />
    </div>
  );
}

function Docket({color, href, image, info, license, title, version, website}) {
  return (
    <div className='mb-6'>
      <h2 className='text-xl font-semibold mb-4 mt-10'>Docket</h2>
      <div className="grid grid-cols-2 gap-x-8">
        <div className="mb-3 basis-1/2">
          <Input label="Title" placeholder={title} disabled={true} />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Info" placeholder={info} disabled={true} />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Color" placeholder={color} disabled={true} />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Href" placeholder={href.site} disabled={true} />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Image" placeholder={image} disabled={true} />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Version" placeholder={version} disabled={true} />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="Website" placeholder={website} disabled={true} />
        </div>
        <div className="mb-3 basis-1/2">
          <Input label="License" placeholder={license} disabled={true} />
        </div>
      </div>
    </div>
  );
}

const ArrayInput = React.forwardRef(({label, name, placeholder, setDisableForm, ...rest}, ref) => {
  const [startsWithNumber, setStartsWithNumber] = useState(false);
  const { setValue, getValues } = useFormContext();

  const setArrayValues = (value) => {
    const previousValue = getValues('dev-input.keywords');
    let currentValue;
    currentValue = value.split(' ');
    if(previousValue.length > 1) {
      currentValue = currentValue.join().split(',');
    }
    isStartingWithNumber(currentValue);
    setValue('dev-input.keywords', currentValue)
  }

  const isStartingWithNumber = (keywords) => {
    const startsWithNumber = keywords.map((keyword) => !!keyword.match(/^[0-9]/)).filter((startsWithNumber) => startsWithNumber);
    if (startsWithNumber.length > 0) {
      setStartsWithNumber(true);
      setDisableForm(true);
      return;
    }
    setStartsWithNumber(false);
    setDisableForm(false);
  }

  return (
    <>
      <div ref={ref}>
        <label className="text-sm font-semibold text-gray-800" htmlFor={name}>{label}</label>
        <input
          name={name}
          type="text"
          className="border border-gray-800 text-gray-800 text-sm  focus:ring-gray-900 focus:border-gray-900 w-full p-1.5"
          onChange={(e) => setArrayValues(e.target.value)}
          {...rest}
        />
      </div>
      <ul className='flex justify-start mt-2 gap-x-1 flex-wrap'>
        { getValues('dev-input.keywords') && !startsWithNumber
          ? getValues('dev-input.keywords').map((keyword, index) => <Tag key={keyword + index} name={keyword} />)
          : <Alert color='red' message='Keywords cannot start with a number' icon="exclamation-triangle" />
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
          {...rest}
          ref={ref}
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
