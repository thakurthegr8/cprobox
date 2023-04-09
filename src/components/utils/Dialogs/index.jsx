import React from "react";
import { Transition } from "@headlessui/react";
import Layout from "../Layout";
import { Dialog as HeadlessDialog } from "@headlessui/react";

const DialogWrapper = (props) => {
  return (
    <Layout.Col className="fixed inset-0 justify-end sm:justify-center sm:items-center bg-black/50">
      <Transition.Child
        as="div"
        enter="ease-out duration-100"
        enterFrom="translate-y-4 sm:opacity-0 sm:scale-95"
        enterTo="translate-y-0 sm:opacity-100 scale-100"
        leave="ease-in duration-100"
        leaveFrom="translate-y-0 sm:opacity-100 sm:scale-100"
        leaveTo="translate-y-4 sm:opacity-0 sm:scale-95"
      >
        <HeadlessDialog.Panel>
          <Layout.Col className="w-full md:w-96 bg-white rounded-xl border shadow-xl  overflow-hidden">
            {props.children}
          </Layout.Col>
        </HeadlessDialog.Panel>
      </Transition.Child>
    </Layout.Col>
  );
};

const Dialog = (props) => {
  if (props.open === undefined || props.toggle === undefined)
    return <>no params</>;

  return (
    <Transition as="div" appear show={props.open}>
      <HeadlessDialog as="div" onClose={() => props.toggle(false)}>
        <DialogWrapper>{props.children}</DialogWrapper>
      </HeadlessDialog>
    </Transition>
  );
};


export default Dialog;