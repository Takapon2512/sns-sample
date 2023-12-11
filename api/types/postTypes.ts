export type postType = {
    title: string;
    description: string;
    uid: string | undefined;
    email: string | null | undefined
};

export type postDBType = {
    username: string;
    usericon: string;
    title: string;
    description: string;
    imageUrl: string;
    created_at: string;
    good_users: string;
    uid: string;
}