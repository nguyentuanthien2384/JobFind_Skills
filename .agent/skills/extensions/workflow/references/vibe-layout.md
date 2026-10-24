# Cấu trúc tương thích source vibe-coding

Giữ .agent/skills với 9 core (brainstorm, system-planner, code-db, code-api, code-ui, integrate-api, save-context, init-teckstack, archive-memory) và extensions. Có 42 skill entrypoints, 25 workflows, 18 templates; thay công nghệ và nghiệp vụ không thuộc JobFind bằng source hiện có.

Các nhóm .docs: ideas, design-briefs, frontend-plans, backend-plans, endpoint-apis, qa, ui-mockups, verification, archive. 31 feature IDs × 6 docs có evidence source và gaps. .stitch giữ metadata/designs/prompts/DESIGN/SITE/backlog/next-prompt; 37 HTML/PNG là bản tham chiếu gốc, không là ứng dụng đã tích hợp.

Xuất: python scripts/export_vibe_bundle.py --out <new-directory>; thêm --apply để ghi. Kiểm tra: python tools/verify_bundle.py --project <JobFind-root>. Cài: python tools/install.py --project <JobFind-root>; giải quyết xung đột bằng đọc/hợp nhất nội dung rồi --apply. Không có force overwrite. Không cài README/tools vào root ứng dụng; công cụ nằm trong .agent/scripts. Giữ frontend/backend/microservices nguyên stack hiện tại.

Mỗi skill trong source có SKILL.md, agents/openai.yaml, references và resources cần thiết. JobFind-workflow chứa seed nền và công cụ ghép bộ đầy đủ trong tài khoản; bản export bỏ seed khỏi chính skill workflow để tránh lặp vô hạn.


Nguồn seed giữ feature docs/workflows/templates/HTML; exporter ghép 42 skills và 37 PNG từ các skill nghiệp vụ theo reference-packs.json. Chạy exporter trước cài/verify bộ hoàn chỉnh. Mỗi skill và ảnh gốc có một nguồn được lưu; không phải một nested copy của toàn bộ thư viện.
