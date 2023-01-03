import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AddReviewModal } from "../../components/AddReviewModal";
import { GoBack } from "../../components/GoBack";
import { Sidebar } from "../../components/Sidebar";
import { Tabs } from "../../components/Tabs";
import { getUrbitApi } from "../../utils/urbitApi";

const api = getUrbitApi();

export function DevApplicationPage(props) {
  const {application} = useParams();
  const [appInfo, setAppInfo] = useState();
  const [downloadLink, setDownloadLink] = useState('');
  const [applications, setApplications] = useState([]);
  const [selectedButton, setSelectedButton] = useState('Comments');

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
   
      await api.subscribe({
        app: "dev-server",
        path: "/render",
        event: handleUpdate,
        err: (err) => setErrorMsg(err),
        quit: (err) => setErrorMsg(err),
        cancel: (err) => setErrorMsg(err),
      })
  };

  const handleUpdate = (data) => {
    if (data) {
      setApplications(data["dev-map"]);
      const app = findApplication(application);
      // app is undefined
      console.log(app);
      setAppInfo(app);
    }
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  const findApplication = (name) => (applications.find((app) => app.key['app-name'] === name));

  const tabs = [{name: 'Reviews'}, {name: 'Comments'}];

  const selectButton = (event) => {
    setSelectedButton(event.target.textContent);
  }

  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <div className="flex flex-col w-full min-h-screen">
        <main className="ml-32 basis-3/4 h-full">
          <div className="w-4/5 space-y-14 py-14">
            <GoBack titlePreviousPage="My Curated Apps" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h1 className="text-5xl font-bold">{application}</h1>
                  { appInfo ?
                    <h3 className="text-2xl">{appInfo.key['dev-name']}</h3>
                    : null }
                </div>
                <button
                  type="submit"
                  className="text-2xl h-1/2 mt-auto font-bold bg-gray-800 text-white py-2 px-5"
                  onClick={() => navigator.clipboard.writeText(downloadLink)}
                >Copy to clipboard</button>
              </div>
              { appInfo ? (
                <>
                  <Rating ratings={appInfo.ratings}/>
                  <CarouselApplicationImages links={appInfo.screenshots}/>
                  <p className="text-lg text-justify mt-5">
                    {appInfo.description}
                  </p>
                  <Tabs selectButton={selectButton} selectedButton={selectedButton} tabs={tabs}/>
                  { selectedButton === 'Reviews' && <Reviews reviews={appInfo.reviews} appKey={appInfo.key} hash={appInfo['desk-hash']}/>}
                  { selectedButton === 'Comments' && <Comments comments={appInfo.comments} appKey={appInfo.key} />}
                </>
              ) : null }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Rating({ratings}) {
  const [rating, setRating] = useState(5);
  const [filledStars, setFilledStars] = useState([]);
  const [emptyStars, setEmptyStars] = useState([]);

  useEffect(() => {
    const currentRating = avgRating();
    setRating(currentRating);

    const fillStars = Math.floor(currentRating);
    setFilledStars([...Array(currentRating).keys()]);

    const empStars = 5 - fillStars;
    setEmptyStars([...Array(empStars).keys()]);
  }, []);
  const avgRating = () => {
    const total = ratings.reduce((prev, curr) => prev + curr['rating-num'], 0);
    const avg = (total / ratings.length);
    if (!Number.isFinite(avg) || Number.isNaN(avg)) {
      return 0;
    }
    return avg;
  }
  return (
    <div className="flex items-center mb-5">
      { filledStars.length ? (
          <ul className="flex">
            { filledStars.map((star) =>
            <li key={star}>
              <svg
                aria-hidden="true"
                className="text-gray-600 w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </li>
          ) }
          </ul>
        ) : null }
      { emptyStars.length ? (
          <ul className="flex">
            { emptyStars.map((empStar, i) =>
          <li key={empStar + i}>
            <svg
              aria-hidden="true"
              className="text-gray-200 w-10 h-10"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </li> ) }
          </ul>
        ) : null }

      <p className="ml-2 text-2xl font-medium dark:text-gray-400">{rating}/5</p>
  </div>
  );
}

function CarouselApplicationImages({links}) {
  // Make an actual carousel
  return (
    <div className="grid grid-cols-3 w-full gap-3">
      <ApplicationImage src={links[0]}/>
      <ApplicationImage src={links[1]}/>
      <ApplicationImage />
    </div>
  );
}

function ApplicationImage({src, alt}) {
  return (
    <div
    className="relative w-full h-56 md:h-64 mr-10 rounded-lg overflow-hidden border border-black"
    style={{ backgroundColor: 'antiquewhite' }}
  >
    <img
      className="h-full w-full object-cover"
      src={src}
      alt={alt}
      />
  </div>
  );
}

function Reviews({reviews, appKey, hash}) {
  return (
    <div className="flex flex-col space-y-2">
      <AddReviewModal appKey={appKey} hash={hash}/>
      <ul className="flex flex-col space-y-2">
        { reviews.length ?
          reviews.map((review) =>
            <Review
              key={review.id}
              user={review.user}
              text={review.text}
              isSafe={review['is-safe']}
              appKey={appKey}
            />
          ) : null
        }
      </ul>
    </div>
  );
}

function Review({text, user, appKey, isSafe}) {

  const deleteReview = () => {
    const review = { key: appKey };
    executeAction(review);
  }

  const executeAction = (review) => {
    api.poke({
      app: "usr-server",
      mark: "app-store-visit-dev-action",
      json: { "del-rev": review },
      onSuccess: () => console.log('Successfully done'),
      onError: (err) => setErrorMsg(err),
    });
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };
  return (
    <li className="flex items-center space-x-3 text-sm leading-tight">
      <div className="h-28 w-full p-4 rounded bg-gray-200">
        <div className="flex flex-row flex-auto justify-between">
          <div className='flex flex-col space-y-3'>
            <div className="flex">
              <div
                className="flex-none relative w-8 h-8 mr-2 rounded-full bg-gray-200 overflow-hidden"
                style={{ backgroundColor: 'grey' }}
                >
              </div>
              <p className="text-lg font-bold mr-5">{user}</p>
              { !isSafe ?
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                : <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
              }
            </div>
            <div className='flex flex-col space-y-3'>
              <p className='text-base'>
                {text}
              </p>
            </div>
          </div>
          <div>
            { user.includes(window.ship) ?
              <button
                type="button"
                className="block ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
                onClick={() => deleteReview()}
              >
                delete
              </button>
              : null
            }
          </div>
        </div>
      </div>
    </li>
  );
}


function Comments({comments, appKey}) {
  return (
    <>
      <CommentForm appKey={appKey} />
      <ul className="flex flex-col space-y-2">
        { comments.map((comment) =>
          <Comment
            key={comment.id}
            user={comment.user}
            text={comment.text}
            id={comment['created-at-str']}
            appKey={appKey}
          /> )}
      </ul>
    </>
  );
}

function Comment({text, user, id, appKey}) {
  const deleteComment = () => {
    const comment = {
      key: appKey,
      "created-at-str": id
    }
    executeAction(comment);
  }

  const executeAction = (comment) => {
    api.poke({
      app: "usr-server",
      mark: "app-store-visit-dev-action",
      json: { "del-com": comment },
      onSuccess: () => console.log('Successfully done'),
      onError: (err) => setErrorMsg(err),
    });
  }

  const setErrorMsg = (msg) => { throw new Error(msg); };

  return (
    <li className="flex items-center space-x-3 text-sm leading-tight">
      <div className="h-28 w-full p-4 rounded bg-gray-200">
        <div className="flex flex-row flex-auto justify-between">
          <div className='flex flex-col space-y-3'>
            <div className="flex">
              <div
              className="flex-none relative w-8 h-8 mr-2 rounded-full bg-gray-200 overflow-hidden"
              style={{ backgroundColor: 'grey' }}
              >
              </div>
              <p className="text-lg font-bold">{user}</p>
            </div>
            <div className='flex flex-col space-y-3'>
              <p className='text-base'>
                {text}
              </p>
            </div>
          </div>
          <div>
          { user.includes(window.ship) ?
              <button
                type="button"
                className="block ml-auto font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
                onClick={() => deleteComment()}
              >
                delete
              </button>
              : null
            }
          </div>
        </div>
      </div>
    </li>
  );
}

function CommentForm({appKey}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      key: appKey,
      text: ''
    }
  });
  const onSubmit = (comment) => {
    console.log(comment);
    submitNew(comment);
  };

  const submitNew = (comment) => {
    api.poke({
      app: "usr-server",
      mark: "app-store-visit-dev-action",
      json: { 'add-com': comment },
      onSuccess: () => console.log('Successfully done'),
      onError: (err) => setErrorMsg(err),
    });
  };

  const setErrorMsg = (msg) => { throw new Error(msg); };

  return (
    <form className="relative">
      <textarea
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-900"
        placeholder="Leave a comment..."
        {...register('text')}
      >
      </textarea>
      <button
        type="submit"
        className="absolute bottom-2.5 right-2.5 font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5"
        onClick={handleSubmit(onSubmit)}
      >Comment</button>
    </form>
  );
}
