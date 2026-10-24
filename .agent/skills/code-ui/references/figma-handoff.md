# JobFind — Figma handoff hiện hành

## Hai nguồn thiết kế độc lập
Exact Stitch: https://stitch.withgoogle.com/projects/4225480897019041322, 37 native refs/34desktop3mobile; use match-reference.
Figma V2 supplementary: https://www.figma.com/design/aASrpnjI0sgztK3QB3fxtd?node-id=46-647, 192screen/state (145desktop47mobile). Desktop1440 là normalized target riêng; code không mặc định đã triển khai.

Native JF-001…037 không đồng nhất JF2/V2keys. Tìm node hiện hành bằng figma-nodes.json/V2catalog và tool metadata; ID chưa có để null. Không dùng canvas từ PNG raster. Bản Figma cũ 37frames là lịch sử trong cùngfile, không coi là toàn bộ currenttarget.

Load mandatory Figma plugin skills trước dùng công cụ: create-new-file khi tạo file, figma-use trước use_figma, generate-design cho composed view, design-to-code trước get_design_context. Inspect screenshot/frame/layout; preserve editability khi user yêu cầu. Ghi image-only nếu chỉ là ảnh.

Map feature/screen/variant→route/parent guard→component/service/API/schema/store; native references nằm trong workflow asset/bootstrapped .stitch/designs. Match-reference giữ tokens/layout/source gaps; normalized branding chỉ theo yêu cầu. Calendar/settings/recurring billing cần plan contract/readiness. Link/node/screenshot là design evidence; code/test statuses riêng.
