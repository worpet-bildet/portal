import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { IconImageInput } from "../../components/IconImageInput";
import { Input } from "../../components/Input";
import { Sidebar } from "../../components/Sidebar";
import { TextAreaInput } from "../../components/TextAreaInput";
import { getUrbitApi } from "../../utils/urbitApi";

const api = getUrbitApi();

export function CuratorWelcome() {
  return(
    <div className='flex flex-row'>
      <Sidebar/>
      <main className="ml-32 basis-3/4 w-full min-h-screen">
        <div className="w-4/5 space-y-6 py-14">
          {"Welcome to your Curator profile. Here is some information to get you started with curating on App Store."}
        </div>
      </main>
    </div>
  );
}
