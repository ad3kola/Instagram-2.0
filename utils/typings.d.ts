import { SexType } from "@faker-js/faker";

export type SidebarLinksProps = {
  name: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  onClick?: () => void;
};

export interface UsersProps {
  _id: string;
  avatar: string;
  email: string;
  fullName: string;
  sex: SexType;
}

export type InitialPostDetailsProps = Omit<PostDetailsProps, "id">;

export interface PostDetailsProps {
  readonly id: string;
  postText: string;
  userName: string;
  userImage: string;
  postImage?: string;
  userEmail: string;
  createdAt: any;
}

export interface CommentDetailsProps {
  readonly commentId: string;
  userName: string;
  userImage: string;
  userEmail: string;
  comment: string;
  createdAt: any;
}

export type InitialCommentDetailsProps = Omit<CommentDetailsProps, "commentId">;

export type AuthProviderProps = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}