import Link from "next/link";

// Import scss and any:
import "@/ListContentMenu/ListTheLoai.scss";

interface ContentTheLoai {
    id: number,
    title: string,
    link: string,
}

const ListTheLoai: React.FC = () => {


    const ContentTheLoai: ContentTheLoai[] = [
        {
            id: 1,
            title: 'Truyện mới cập nhật',
            link: '/TruyenMoiCapNhat'
        },
        {
            id: 2,
            title: 'Tiên hiệp',
            link: '/TruyenMoiCapNhat'
        },
        {
            id: 3,
            title: 'Tiên hiệp',
            link: '/TruyenMoiCapNhat'
        },
        {
            id: 4,
            title: 'Tiên hiệp',
            link: '/TruyenMoiCapNhat'
        },
    ];

    const RenderContentTheLoai: React.FC = () => {
        return (
            ContentTheLoai.map((item) => {
                return (
                    <div className="ContentTheLoai" key={item.id}>
                        <Link href={item.link}>{item.title}</Link>
                    </div>
                )
            })
        )
    }

    return (
        <><RenderContentTheLoai /></>
    );
};
export default ListTheLoai;