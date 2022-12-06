import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GoBack } from "../../components/GoBack";
import { Sidebar } from "../../components/Sidebar";
import { Tabs } from "../../components/Tabs";

export function ApplicationPage(props) {
  const {application} = useParams();
  const [selectedButton, setSelectedButton] = useState('Reviews');

  const tabs = [{name: 'Reviews'}, {name: 'Comments'}];

  const comments = [
    {user: { image: '', name: '~sampel-palnet'}, comment: 'This is a sample for a comment well explained and with lots of sense as the real life.'},
    {user: { image: '', name: '~sampel-palnet'}, comment: 'This is a sample for a comment well explained and with lots of sense as the real life.'}
  ];

  const selectButton = (event) => {
    setSelectedButton(event.target.textContent);
  }

  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <main className="relative basis-3/4 flex items-center w-full justify-center min-h-screen">
        <div className="absolute top-0 w-4/5 space-y-14 py-14">
          <GoBack titlePreviousPage="My Curated Apps" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h1 className="text-5xl font-bold">{application}</h1>
                <h3 className="text-2xl">Meta, Inc.</h3>
              </div>
              <button type="submit" className="text-2xl h-1/2 mt-auto font-bold bg-gray-800 text-white py-2 px-5" href="">Download</button>
            </div>
            <Rating />
            <CarouselApplicationImages />
            <p className="text-lg text-justify mt-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut maiores laborum exercitationem deserunt doloremque quae sed itaque earum rerum nostrum quia facere, debitis, molestiae excepturi atque quaerat repellat! Quidem, tempora.
            </p>
            <Tabs selectButton={selectButton} tabs={tabs}/>
            { selectedButton === 'Reviews' && <Reviews comments={comments} />}
            { selectedButton === 'Comments' && <Comments comments={comments} />}
          </div>
        </div>
      </main>
    </div>
  );
}

function Rating(props) {
  // Change the number for the actual rate from the application
  return (
    <div className="flex items-center mb-5">
      <svg aria-hidden="true" className="text-yellow-400 w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <svg aria-hidden="true" className="text-yellow-400 w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <svg aria-hidden="true" className="text-yellow-400 w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <svg aria-hidden="true" className="text-yellow-400 w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <svg aria-hidden="true" className="text-gray-300 w-10 h-10 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
      <p className="ml-2 text-2xl font-medium dark:text-gray-400">4.8/5</p>
  </div>
  );
}

function CarouselApplicationImages(props) {
  // Make an actual carousel
  return (
    <div className="grid grid-cols-3 w-full gap-3">
      <ApplicationImage />
      <ApplicationImage />
      <ApplicationImage />
    </div>
  );
}

function ApplicationImage(props) {
  return (
    <div
    className="relative w-full h-56 md:h-64 mr-10 rounded-lg overflow-hidden border border-black"
    style={{ backgroundColor: 'antiquewhite' }}
  >
    <img
      className="h-full w-full object-cover"
      src={props.src}
      alt={props.alt}
      />
  </div>
  );
}

function Reviews(props) {
  return (
    <div className="flex flex-col space-y-2">
      <button type="submit" className="block ml-auto rigth-10 font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5" href="">Add a review</button>
      <ul className="flex flex-col space-y-2">
        { props.comments.map((comment) => <Comment key={comment.user.name} user={comment.user} comment={comment.comment} /> )}
      </ul>
    </div>
  );
}

function Comments(props) {
  return (
    <>
      <CommentForm />
      <ul className="flex flex-col space-y-2">
        { props.comments.map((comment) => <Comment ey={comment.user.name} user={comment.user} comment={comment.comment} /> )}
      </ul>
    </>
  );
}

function Comment(props) {
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
                <img
                className="h-full w-full object-cover"
                src={props.user.image}
                alt=""
                />
              </div>
              <p className="text-lg font-bold">{props.user.name}</p>
            </div>
            <div className='flex flex-col space-y-3'>
              <p className='text-base'>
                {props.comment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function CommentForm(props) {
  return (
    <form className="relative">
      <textarea rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-900" placeholder="Leave a comment...">
      </textarea>
      <button type="submit" className="absolute bottom-2.5 right-2.5 font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-0.5 px-5" href="">Comment</button>
    </form>
  );
}