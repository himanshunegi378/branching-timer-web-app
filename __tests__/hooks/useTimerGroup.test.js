import { renderHook } from '@testing-library/react-hooks'
import { expect } from "chai";
import { act } from "react-test-renderer";
import useTimerGroup from '../../src/hooks/useTimerGroup';

describe('useTimerGroup',()=>{
    it("test",()=>{
        const { result, wait, rerender } = renderHook(
            () => useTimerGroup()
        );
    })
})