/**
 * This file is used to set up Enzyme to work with Jest
 */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
