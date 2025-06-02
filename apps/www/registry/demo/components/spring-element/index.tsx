import { SpringElement } from '@/registry/components/spring-element';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/ui/avatar';

export default function SpringElementDemo() {
  return (
    <SpringElement>
      <Avatar className="size-20">
        <AvatarImage
          draggable={false}
          src="https://pbs.twimg.com/profile_images/1897311929028255744/otxpL-ke_400x400.jpg"
        />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
    </SpringElement>
  );
}
