# JobFind — Bộ skills đầy đủ theo vibe-coding

42 skills = 9 core + 33 extensions. 31 nhóm chức năng × 6 tài liệu; 25 workflows và 18 templates. Tất cả bám source React JS/CRA, Express/Sequelize và microservices thật, đồng thời nối exact Stitch 37 màn.

## Bắt đầu
1. Đọc AGENTS.md, .agent/skill-registry.md, .docs/CONTEXT.md và .docs/INDEX.md.
2. Chọn feature/screen/variant, source mode và scope; nạp đúng skills/references.
3. Chạy python tools/verify_bundle.py --project <JobFind-root> để kiểm tra static joins.
4. Chạy python tools/install.py --project <JobFind-root> (dry-run), giải quyết file conflicts, thêm --apply để cài. Không có force overwrite. README/tools không chép lên root app; công cụ nằm trong .agent/scripts.

## Vẽ tiếp và code
- /stitch-design, /stitch-loop, /enhance-prompt, /design-system, /figma-handoff cho thiết kế.
- /plans → /execute-ui hoặc /execute-backend → /integrate → /verify cho code; /full-feature điều phối trọn scope.
- /save, /resume, /archive giữ ngữ cảnh và bằng chứng.
Slash commands tùy IDE; nếu chưa hỗ trợ, yêu cầu đọc file workflow tương ứng. Tên ChatGPT dùng jobfind-* như registry.

## Liên kết
Stitch: https://stitch.withgoogle.com/projects/4225480897019041322
Figma V2 bổ sung: https://www.figma.com/design/aASrpnjI0sgztK3QB3fxtd?node-id=46-647

37 native màn gồm 34 desktop/3 mobile; 192 Figma screen/state là bộ bổ sung độc lập. Không coi số màn là số routes hoặc code hoàn thành. 94 declarations/92 route patterns, 124 legacy endpoints, 71 modern operations/42 schemas được kiểm kê static. Calendar tổng hợp/settings/recurring billing là proposal; xem DESIGN_GAPS.

## Công cụ
- inspect_project.py: source metadata, không mở .env/CV/SQL.
- check_screen_coverage.py/verify_bundle.py: source/doc/catalog links, PNG/HTML hashes.
- prepare_screen_prompt.py: prompt cho screen/variant, không gọi dịch vụ.
- update_baton.py: statuses độc lập, complete cần evidence, default dry-run.
- save_checkpoint.py: archive checksum trước cập nhật context, default dry-run.

Các kiểm tra bộ skills không chứng minh runtime ứng dụng; test-release chọn checks sau patch thật.
