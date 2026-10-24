# Component map và contracts

component-map.json nối37screens với source components cần inspect, reference blocks/actions/APIs và states. Entries là source candidates + design blocks, chưa khẳng định mọi block đã có component hoàn chỉnh. Không đoán props/state từ tên file; đọc implementation/callers.

## Handoff cụ thể
- [Ứng tuyển JF-024/023](handoffs/apply-JF-024-JF-023.md): existing props/state/payload, CV/portfolio/wizard/limits gaps.
- [Lịch JF-014](handoffs/calendar-JF-014.md): snapshot readmodel, permissions, temporal behavior và proposal boundary.

Các features khác đọc six docs + screencontract và source trong map, bổ sung per-screenhandoff khi code. New presentation blocks phải có nhãn đề xuất; reuse current shell/services và ReactJS/CRA conventions.
