# Quy trình chuyển từ vibe-coding
| Lệnh quen thuộc | Skill | Kết quả |
|---|---|---|
| /brainstorm | brainstorm | Ý tưởng có tradeoff dựa trên source |
| /plans /plan-backend | system-planner | Kế hoạch UI, contract, data, test |
| /code-db | code-db | Migration/model/store của DB đúng owner |
| /code-api | code-api | Route/contract/controller/service |
| /code-ui | code-ui | React JS/CSS theo Stitch và component cũ |
| /integrate | integrate-api | API adapter và đầy đủ UI states |
| /execute-backend | workflow + db/api/domain | Lát backend hoàn chỉnh |
| /execute-ui | workflow + code-ui/integrate | Lát UI hoàn chỉnh |
| /verify | test-release | Bằng chứng kiểm tra đúng phạm vi |
| /save /archive /resume | save-context | Tiến độ không mất lịch sử |

Mẫu vibe-coding tham chiếu: `ecommerce-fullstack-js/.agent/skills/` và workflows, đối chiếu thêm ecommerce-platform. Kế thừa phân tách brainstorm/plan/db/api/ui/integrate/save, không sao chép các luật Next.js/Prisma/Tailwind/Redux trái package JobFind. Không kế thừa yêu cầu dừng hỏi sau mỗi bước, bỏ lỗi khỏi nhật ký hoặc xóa toàn bộ lịch sử. `triggers` của mẫu được đưa vào description/registry, không thêm frontmatter ngoài name/description.
