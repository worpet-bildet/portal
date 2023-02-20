import React from 'react'

export function ItemModal ({ title, image, description, pictures, tags, type, onRequestClose }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end w-full cursor-pointer" onClick={onRequestClose}>X</div>
      <div className="flex flex-col px-5">
        <div className="flex flex-row w-100">
          <img className="w-1/3" src={image}></img>
          <div className="flex flex-col pl-3 pt-3">
            <div className="text-2xl font-bold">{title}</div>
            <div className="pt-3">{description}</div>
            <div className="text-xs pt-3 font-bold">1,384 downloads</div>
          </div>
        </div>
        <div className="pt-3">
          <span>Tags: </span>
          {tags.map((t, i) => (
            <span>
              <a className="underline" href="https://google.com" key={i}>{t}</a>
              &nbsp;
            </span>
          ))}
        </div>
        <div className="flex flex-row w-full justify-end pt-5">
            <a
              className="text-xl font-bold underline"
              href="https://google.com"
            >
              Get {title}
            </a>
        </div>
      </div>
    </div>
  )
}