import { Dialog, Transition } from '@headlessui/react';
import { IconSettings } from '@tabler/icons';
import { Fragment, useState } from 'react';

const RightNavigation = () => {
	const [open, setOpen] = useState(false);

	return (
		<div className="bg-white flex sticky right-0">
			<div className="py-8 px-4">
				<button
					className="text-gray-400 hover:text-gray-600"
					onClick={() => setOpen(!open)}
				>
					<IconSettings />
				</button>
			</div>

			<div className="border-l-[1px] border-gray-200" hidden={open}>
				<div className="py-8 px-4">
					<div>
						<input className="border border-black" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default RightNavigation;
