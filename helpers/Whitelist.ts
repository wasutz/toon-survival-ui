import whitelist from '../configs/Whitelist.json';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

const addresses: string[] = <string[]> whitelist;

export default new class Whitelist {
    private merkleTree!: MerkleTree;

    private getMerkleTree(): MerkleTree
    {
      if (this.merkleTree === undefined) {
        const leafNodes = addresses.map((addr: string) => keccak256(addr));

        this.merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      }

      return this.merkleTree;
    }

    public getProofForAddress(address: string): string[] {
      return this.getMerkleTree().getHexProof(keccak256(address));
    }

    public contains(address: string): boolean {
      return this.getMerkleTree().getLeafIndex(Buffer.from(keccak256(address))) >= 0;
    }
  };