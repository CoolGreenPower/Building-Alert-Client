import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Example(props) {
  return (
    <div className="tw-bg-indigo-600 tw-rounded-md">
      <div className="tw-mx-auto tw-max-w-7xl tw-py-2 tw-px-3 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between">
          <div className="tw-flex tw-w-0 tw-flex-1 tw-items-center">
            <span className="tw-flex tw-rounded-lg tw-bg-indigo-800 tw-p-2">
              <MegaphoneIcon className="tw-h-6 tw-w-6 tw-text-white" aria-hidden="true" />
            </span>
            <p className="tw-ml-3 tw-m-0 tw-truncate tw-font-medium tw-text-white">
              <span className="md:tw-hidden">This alert has been assigned to {props.name}.</span>
              <span className="tw-hidden md:tw-inline">This alert has been assigned to {props.name}.</span>
            </p>
          </div>
          <div className="tw-order-2 tw-flex-shrink-0 sm:tw-order-3 sm:tw-ml-3">
            {/* <button
              type="button"
              className="tw-mr-1 tw-flex tw-rounded-md tw-p-2 hover:tw-bg-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white sm:tw-mr-2"
            >
              <span className="tw-sr-only">Dismiss</span>
              <XMarkIcon className="tw-h-6 tw-w-6 tw-text-white" aria-hidden="true" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}
