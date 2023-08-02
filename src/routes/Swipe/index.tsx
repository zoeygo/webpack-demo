import Swipe from './Swipe';
import { SwipeItem } from './SwipeItem';

type Component = typeof Swipe;

interface SwipeInterface extends Component {
    Item: typeof SwipeItem,
}

const TestSwipe = Swipe as SwipeInterface;

TestSwipe.Item = SwipeItem;

export default TestSwipe;