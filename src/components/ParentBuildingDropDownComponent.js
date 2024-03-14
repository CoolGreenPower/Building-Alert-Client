import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ReactPlaceholder from 'react-placeholder';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

var buildingNameSkeleton = (
  <div role="status" class="tw-max-w-sm tw-animate-pulse tw-ml-4">
    <div class="tw-h-2 tw-bg-gray-200 tw-rounded-full tw-max-w-[150px] tw-mb-2.5"></div>
  </div>
);

var defaultSkeleton =(
  <div class="tw-h-2.5 tw-mt-1 tw-bg-gray-200 tw-rounded-full tw-max-w-[150px] tw-text-white ">_____________</div>
);

var propReady = false

export default function Example(props) {
  return (
    <Menu as="div" className="tw-relative tw-inline-block tw-text-left tw-select-none">
      <div>
        {props.map.size == 1 && <div class="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-100"><ReactPlaceholder ready={true} customPlaceholder={defaultSkeleton}> {props.parentBuildingName} </ReactPlaceholder></div>}
          {props.map.size > 1 && <Menu.Button className="tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-700 tw-shadow-sm hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-100">
              <ReactPlaceholder ready={true} customPlaceholder={defaultSkeleton}> {props.parentBuildingName} </ReactPlaceholder>
              <ChevronDownIcon className="tw-mr-1 tw-ml-2 tw-h-5 tw-w-5" aria-hidden="true" />
          </Menu.Button>}
      </div>

      <Transition
        as={Fragment}
        enter="tw-transition tw-ease-out tw-duration-100"
        enterFrom="tw-transform tw-opacity-0 tw-scale-95"
        enterTo="tw-transform tw-opacity-100 tw-scale-100"
        leave="tw-transition tw-ease-in tw-duration-75"
        leaveFrom="tw-transform tw-opacity-100 tw-scale-100"
        leaveTo="tw-transform tw-opacity-0 tw-scale-95"
      >
        <Menu.Items className="tw-absolute tw-right-0 tw-z-10 tw-mt-2 tw-w-56 tw-origin-top-right tw-rounded-md tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none">
          <div className="tw-py-1">
            {
                Array.from(props.map.keys()).length > 0 &&
                Array.from(props.map.keys()).map(pb => {
                    return (
                        <Menu.Item onClick={() => props.onSelectPb(pb)}>
                        {({ active }) => (
                            <a
                            href="#"
                            className={classNames(
                                active ? 'tw-bg-gray-100 tw-text-gray-900' : 'tw-text-gray-700',
                                'tw-block tw-text-sm'
                            )}
                            >
                              {/* {pb.name != props.currentBuilding['name'] && <ReactPlaceholder ready={true} customPlaceholder={buildingNameSkeleton}><p class="tw-px-4 tw-py-2 tw-m-0">{pb.name}</p></ReactPlaceholder>} */}
                            {pb.name != props.parentBuildingName && <ReactPlaceholder ready={true} customPlaceholder={buildingNameSkeleton}><p class="tw-px-4 tw-py-2 tw-m-0">{pb.name}</p></ReactPlaceholder>}
                            </a>
                        )}
                        </Menu.Item>
                    )
                })
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
